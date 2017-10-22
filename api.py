from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask,render_template,request,flash,redirect,url_for,jsonify,session,abort
import os
import psycopg2
import json
from urllib import parse
from flask_cors import CORS,cross_origin

# parse.uses_netloc.append("postgres")
# url = parse.urlparse(os.environ["DATABASE_URL"])


api = Flask(__name__)
api.secret_key = "SECRET"

#@cross_origin(allow_headers=['Content-Type'])
@api.route("/login", methods = ['POST'])
def loginUser():
    form_data = request.get_json()
    user = form_data['username']
    password = form_data['password']
    cursor = conn.cursor()
    cursor.execute(" select row_to_json(a) from (select password from user_data where username = '"+user+"')a")
    hashpass = cursor.fetchall()
    if len(hashpass) < 1:
        abort(400,'User does not exist in the system')
    elif check_password_hash(hashpass[0][0]['password'], password):
        cursor = conn.cursor()
        cursor.execute("select row_to_json(a) from (select user_id,first_name,last_name from user_data where username = '"+user+"')a")
        userData = cursor.fetchall()
        session['userToken'] = userData[0][0]['user_id']
        cursor.close()
        return jsonify({"user_id" : userData[0][0]['user_id'],"first_name":userData[0][0]['first_name'],"last_name":userData[0][0]['last_name']})
    else:
        abort(400,'Incorrect Password')

#@cross_origin(allow_headers=['Content-Type'])
@api.route("/")
def hello():
	return "hello"


#@cross_origin(allow_headers=['Content-Type'])
@api.route("/getUserData", methods=['GET'] )
def getUserData():
	if request.method == 'GET':
		return "GET Request"
	else:
		return "Request is not get"

def getFundingId(funding):
	curr = conn.cursor()
	curr.execute("select funding_id from funding_info where funding_name like '"+funding+"'")
	fundingId = curr.fetchall()
	return fundingId[0][0]


def getDiagnosisId(diagnosis):
	curr = conn.cursor()
	curr.execute("select diagnosis_id from diagnosis_info where diagnosis_name like '"+diagnosis+"'")
	diagId = curr.fetchall()
	return diagId[0][0]

#@cross_origin(allow_headers=['Content-Type'])
@api.route("/registerUser", methods = ['POST'])
def registerUser():
	try:
		all_args = request.get_json()
		curr=conn.cursor()
		insertQuery = "insert into user_data(username, password, first_name, last_name, phone_number, address, dob, refferal_reason, application_date, email, parent_first_name, parent_last_name) values ( '"+all_args['username']+"','"+generate_password_hash(all_args['password'])+"','"+all_args['first_name']+"','"+all_args['last_name']+"','"+all_args['phone_number']+"','"+all_args['address']+"','"+all_args['dob']+"','"+all_args['refferal_reason']+"','"+all_args['application_date']+"','"+all_args['email']+"','"+all_args['parent_first_name']+"','"+all_args['parent_last_name']+"')"
		curr.execute(insertQuery)
		curr.execute("select user_id from user_data order by user_id desc")
		diagnosis = all_args['diagnosis']
		funding = all_args['funding']
		diagId = getDiagnosisId(diagnosis)
		fundingId = getFundingId(funding)
		userid = curr.fetchall()
		curr.execute("insert into user_diagnosis_map values ("+str(userid[0][0]+1)+","+str(diagId)+" )")
		curr.execute("insert into user_funding_map values ("+str(userid[0][0]+1)+","+str(fundingId)+" )")
		session['userToken'] = userid[0][0]+1
		conn.commit()
		curr.close()
		return jsonify({"success":'true'})

	except Exception as e:
		return jsonify({"success":"false"})

#@cross_origin(allow_headers=['Content-Type'])
@api.route("/registerAdmin", methods = ['POST'])
def resgisterAdmin():
    try:
        all_args = request.get_json()
        curr=conn.cursor()
        insertQuery = "insert into  admin_data(name, role_id, username, password) values ( '"+all_args['name']+"',"+str(all_args['role_id'])+",'"+all_args['username']+"','"+generate_password_hash(all_args['password'])+"')"
        curr.execute(insertQuery)
        conn.commit()
        curr.close()
        return jsonify({"success":'true'})

    except Exception as e:
        return jsonify({"success":"false"})

#@cross_origin(allow_headers=['Content-Type'])
@api.route("/schedule_appointment",methods=['POST'])
def schedule_appointment():
    try:
        req = request.get_json()
        req_text = req['req_text']
        userId = session['userToken']
        insert_appt_req = "insert into appt_req (user_id,req_text,scheduled_flag) values("+str(userId)+",'"+req_text+"','F')"
        cursor = conn.cursor()
        cursor.execute(insert_appt_req)
        conn.commit()
        cursor.close()
        return jsonify({"success":'true'})
    except Exception as e:
        abort(400,'Could not schedule appointment')


#@cross_origin(allow_headers=['Content-Type'])
@api.route("/appointment_data")
def get_appt_data():
    try:
        user_id = session['userToken']
        appt_data_query = "select row_to_json(a) from(select * from appointment where user_id ="+str(user_id)	+")a"
        cursor = conn.cursor()
        cursor.execute(appt_data_query)
        data = cursor.fetchall()
        return jsonify(data[0][0])
    except Exception as e:
        abort(400,"Failed fetching appointment data")

#@cross_origin(allow_headers=['Content-Type'])
@api.route("/admin",methods=['POST'])
def admin_login():
    try:
        req = request.get_json()
        print(req)
        uName = req['username']
        password = req['password']
        cursor = conn.cursor()
        cursor.execute("select row_to_json(a) from (select password from admin_data where username = '"+uName+"')a")
        hashpass = cursor.fetchall()
        if len(hashpass) < 1:
            abort(400,'Admin does not exist in the system')
        elif check_password_hash(hashpass[0][0]['password'], password):
            cursor.execute("select row_to_json(a) from (select admin_id,name,role_id from admin_data where username = '"+uName+"')a")
            adminData = cursor.fetchall()
            session['adminToken'] = adminData[0][0]['admin_id']
            cursor.close()
            return jsonify({"admin_id" : adminData[0][0]['admin_id'],"name":adminData[0][0]['name'],"role_id":adminData[0][0]['role_id']})
        else:
            abort(400,'Incorrect Password')
    except Exception as e:
        abort(400,'Admin login failed')


@api.route("/pending_appointments",methods=["GET"])
def get_pending_appts():
    try:
        req = request.get_json()
        adminToken = session['adminToken']
        pending_appt_query = " select row_to_json(a) from ( select ar.user_id,ud.first_name,ud.last_name,ar.req_text from appt_req ar join user_data ud on ar.userid=ud.userid where scheduled_flag= 'F')a"
        cursor = conn.cursor()
        cursor.execute(pending_appt_query)
        req_data = cursor.fetchall()
        cursor.close()
        return jsonify(req_data)
    except Exception as e:
        abort(400,'Failed getting appt data')


def send_mail(emailText,emailto):
    fromaddr = "YOUR ADDRESS"
    msg = MIMEMultipart()
    msg['From'] = fromaddr
    msg['To'] = emailto
    msg['Subject'] = "NMTSA - Thanks for requesting an appointment"
    body = emailText
    msg.attach(MIMEText(body, 'plain'))
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(fromaddr, "YOUR PASSWORD")
    text = msg.as_string()
    server.sendmail(fromaddr, toaddr, text)
    server.quit()

conn = psycopg2.connect("dbname=Ohacks user=ec2-user")
api.run(debug=True, threaded=True, host = '0.0.0.0', port=8082)



