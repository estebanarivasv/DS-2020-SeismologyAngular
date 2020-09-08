from flask import Blueprint, render_template, current_app, redirect, url_for, request
from flask_login import login_required
import requests, json

from main.forms import NewUserForm, UserToEditForm, NewSensorForm

admin = Blueprint('admin', __name__, url_prefix='/administrator')


# Main page
@admin.route('/home/')
@login_required
def index():
    return render_template('derived/admin/home.html')


# Verified seisms
@admin.route('/verified-seisms/')
@login_required
def main_vseism():
    url = current_app.config["API_URL"] + "/verified-seisms"
    data = requests.get(url=url, headers={'content-type': 'application/json'}, json={})
    verified_seisms = json.loads(data.text)["verified_seisms"]
    return render_template('/derived/admin/verified-seisms/main.html', verified_seisms=verified_seisms)


@admin.route('/verified-seisms/view/<int:id>')
@login_required
def view_vseism(id):
    url = current_app.config["API_URL"] + "/verified-seism/" + str(id)
    data = requests.get(url=url, headers={'content-type': 'application/json'})
    v_seism = data.json()
    return render_template('/derived/admin/verified-seisms/view-vseism.html', v_seism=v_seism)


# Sensors
@admin.route('/sensors/')
@login_required
def main_sensors():
    auth_token = request.cookies['access_token']
    url = current_app.config["API_URL"] + "/sensors"
    data = requests.get(url=url, headers={'content-type': 'application/json', 'authorization': 'Bearer ' + auth_token}, json={})
    sensors = json.loads(data.text)["sensors"]
    return render_template('/derived/admin/sensors/main.html', sensors=sensors)

@admin.route('/sensors/view/<int:id>')
@login_required
def view_sensor(id):
    auth_token = request.cookies['access_token']
    url = current_app.config["API_URL"] + "/sensor/" + str(id)
    data = requests.get(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token})
    sensor = data.json()
    return render_template('/derived/admin/sensors/view-sensor.html', sensor=sensor)

@admin.route('/sensors/add/', methods=["POST", "GET"])
@login_required
def add_sensor():
    auth_token = request.cookies['access_token']
    url = current_app.config["API_URL"] + "/sensors"
    users_url = current_app.config["API_URL"] + "/users"
    u_data = requests.get(
        url=users_url,
        headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token},
        json={})
    user_json = json.loads(u_data.text)
    email_list = [(0, "Select one seismologist email")]
    for user in user_json["users"]:
        email_list.append((user["id_num"], user["email"]))

    print(email_list)
    form = NewSensorForm()

    form.user_id.choices = email_list

    if form.validate_on_submit():
        
        if form.status.data == "false":
            form.status.data = False
        else:
            form.status.data = True
        
        if form.active.data == "false":
            form.active.data = False
        else:
            form.active.data = True

        u_id = form.user_id.data

        sensor = {
            "name": form.name.data,
            "ip": form.ip.data,
            "port": form.port.data,
            "status": form.status.data,
            "active": form.active.data,
            "user_id": u_id
        }
        sensor_json = json.dumps(sensor)
        requests.post(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token}, data=sensor_json)
        return redirect(url_for('admin.main_sensors'))
        
    return render_template('/derived/admin/sensors/add-sensor.html', form=form)

@admin.route('/sensors/edit/<int:id>', methods=["POST", "GET"])
@login_required
def edit_sensor(id):
    auth_token = request.cookies['access_token']
    url = current_app.config["API_URL"] + "/sensor/" + str(id)
    form = NewSensorForm()

    users_url = current_app.config["API_URL"] + "/users"
    u_data = requests.get(url=users_url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token}, json={})
    user_json = json.loads(u_data.text)
    email_list = [(0, "Select one seismologist email")]
    for user in user_json["users"]:
        email_list.append((int(user["id_num"]), user["email"]))
    form.user_id.choices = email_list

    if not form.is_submitted():
        auth_token = request.cookies['access_token']
        # If the form is not sent, makes a request
        data = requests.get(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token})
        if data.status_code == 404:
            return redirect(url_for('admin.main_sensors'))
        
        # Saving the json to a Python dict in order to show it for editing
        sensor = data.json()

        form.name.data = sensor["name"]
        form.ip.data = sensor["ip"]
        form.port.data = sensor["port"]
        if sensor["status"] is False:
            form.status.data = "false"
        else:
            form.status.data = "true"
        if sensor["active"] is False:
            form.active.data = "false"
        else:
            form.active.data = "true"

        try:
            if sensor["user_id"] in sensor:
                for id, email in email_list:
                    if id == int(sensor["user_id"]):
                        form.user_id.data = int(id)
                        print(form.user_id.data)
        except KeyError:
            pass

        try:
            user_a = sensor["user"]
            print(user_a)
            for id, email in email_list:
                if id == int(user_a["id_num"]):
                    form.user_id.data = int(id)
                    print(form.user_id.data)
        except KeyError:
            pass

    if form.validate_on_submit():

        if form.status.data == "false":
            form.status.data = False
        else:
            form.status.data = True
        if form.active.data == "false":
            form.active.data = False
        else:
            form.active.data = True

        u_id = form.user_id.data

        sensor = {
            "name": form.name.data,
            "ip": form.ip.data,
            "port": form.port.data,
            "status": form.status.data,
            "active": form.active.data,
            "user_id": u_id
        }
        sensor_json = json.dumps(sensor)

        data = requests.put(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token}, data=sensor_json)
        return redirect(url_for('admin.main_sensors'))

    return render_template('/derived/admin/sensors/edit-sensor.html', id=id, form=form)


@admin.route('/sensors/delete/<int:id>')
@login_required
def delete_sensor(id):
    auth_token = request.cookies['access_token']
    url = current_app.config["API_URL"] + "/sensor/" + str(id)
    r = requests.delete(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token})

    if r.status_code == 403:
        # send flash you cant delete sensor
        print("send flash you cant delete sensor")
        return redirect(url_for('admin.main_sensors'))
    else:
        return redirect(url_for('admin.main_sensors'))

# Users
@admin.route('/users/')
@login_required
def main_users():
    auth_token = request.cookies['access_token']
    url = current_app.config["API_URL"] + "/users"
    data = requests.get(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token}, json={})
    users = json.loads(data.text)["users"]
    return render_template('/derived/admin/users/main.html', users=users)

@admin.route('/users/add/', methods=["POST", "GET"])
@login_required
def add_user():
    auth_token = request.cookies['access_token']
    url = current_app.config["API_URL"] + "/users"
    form = NewUserForm()
    if form.validate_on_submit():
        if form.admin.data == "false":
            form.admin.data = False
        else:
            form.admin.data = True
        user = {
            "email" : form.email.data,
            "password": form.password.data,
            "admin": form.admin.data
        }
        user_json = json.dumps(user)
        requests.post(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token}, data=user_json)
        return redirect(url_for('admin.main_users'))
        
    return render_template('/derived/admin/users/add-user.html', form=form)

@admin.route('/users/edit/<int:id>', methods=["POST", "GET"])
@login_required
def edit_user(id):
    auth_token = request.cookies['access_token']
    form = UserToEditForm()
    url = current_app.config["API_URL"] + "/user/" + str(id)
    if not form.is_submitted():
        # If the form is not sent, makes a request
        data = requests.get(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token})
        if data.status_code == 404:
            return redirect(url_for('admin.main_users'))
        
        # Saving the json to a Python dict in order to show it for editing
        user = data.json()

        if user["admin"] == False:
            form.admin.data = "false"
        else:
            form.admin.data = "true"

        form.email.data = user["email"]
        form.admin.data = user["admin"]
    
    if form.validate_on_submit():
        if form.admin.data == "false":
            form.admin.data = False
        else:
            form.admin.data = True
        user = {
            "email": form.email.data,
            "admin": form.admin.data
        }
        user_json = json.dumps(user)

        data = requests.put(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token}, data=user_json)
        return redirect(url_for('admin.main_users'))

    return render_template('/derived/admin/users/edit-user.html', id=id, form=form)

@admin.route('/users/delete/<int:id>')
@login_required
def delete_user(id):
    auth_token = request.cookies['access_token']
    url = current_app.config["API_URL"] + "/user/" + str(id)
    requests.delete(url=url, headers={'content-type': 'application/json',
                 'authorization': 'Bearer ' + auth_token})
    return redirect(url_for('admin.main_users'))
