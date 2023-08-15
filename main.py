import datetime
from flask import Flask, render_template, request, url_for, session, redirect
import os
from werkzeug.utils import secure_filename
# from PIL import Image, ImageTk, ImageFilter
# from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user

UPLOAD_FOLDER = os.path.join('static')
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024
app.secret_key = os.getenv('CSRF-KEY')
# 'SUCCESSabalaka2002@'

# main_image = Image.open('static/ce_accra.jpg')
# width, height = main_image.size

num_of_flyers = 0


@app.route('/')
def home():
    return redirect(url_for('home2'))


@app.route('/e-flyer')
def home2():
    date = datetime.datetime.now()
    real_date = date.strftime('%a, %d %b %Y')
    return render_template('parent.html', num_of_flyers=num_of_flyers, date=real_date)


@app.route('/download', methods=['POST', 'GET'])
def upload_file():
    if request.method == 'POST':
        uploaded_img = request.files['user_picture']
        print(uploaded_img)
        img_filename = secure_filename(uploaded_img.filename)
        uploaded_img.save(os.path.join(app.config['UPLOAD_FOLDER'], img_filename))
        session['uploaded_img_file_path'] = os.path.join(app.config['UPLOAD_FOLDER'], img_filename)
        global num_of_flyers
        num_of_flyers += 1
        return render_template('submit.html', pic_filename=img_filename,
                               num_of_flyers=num_of_flyers)
    else:
        return redirect(url_for('home2'))


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
