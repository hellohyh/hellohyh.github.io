# app.py

from flask import Flask, render_template, request, redirect, url_for, make_response, session, send_file
from PIL import Image, ImageDraw, ImageFont
import random
import io

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 用于加密 session 数据的密钥

# 内部用户的用户名和密码列表
internal_users = [
    {"username": "蜜猪部", "password": "520"},
    {"username": "张雅妮", "password": "ZYN"},
    {"username": "张艾嘉", "password": "ZAJ"},
    {"username": "何远豪", "password": "HYH"},
    {"username": "周英健", "password": "ZYJ"},
    {"username": "屈子愉", "password": "QZY"},
    # 添加更多用户
]

@app.route("/")
def index():
    # 获取用户认证的 cookie
    authenticated = request.cookies.get("authenticated") == "true"

    if authenticated:
        welcome_message = "欢迎来到广财蜜猪小分队网站！"
        return render_template("index.html", welcome_message=welcome_message, authenticated=authenticated)
    else:
        return render_template("login.html")

@app.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")
    captcha_input = request.form.get("captcha")

    # 遍历用户列表，验证用户名和密码
    for user in internal_users:
        if username == user["username"] and password == user["password"]:
            # 验证通过，检查验证码
            if captcha_input.lower() == session.get('captcha', '').lower():
                # 验证码正确，设置认证的 cookie，并重定向到首页
                response = make_response(redirect(url_for("index")))
                response.set_cookie("authenticated", "true")
                return response
            else:
                # 验证码错误，返回登录页面
                return render_template("login.html", error_message="验证码错误")

    # 验证失败，返回登录页面
    return render_template("login.html", error_message="用户名或密码错误")

@app.route("/captcha_image")
def captcha_image():
    # 生成验证码图片
    image = generate_captcha()
    # 将验证码保存到 session 中，用于验证
    session['captcha'] = image[1]
    # 将图片以文件流的形式返回给客户端
    img_io = io.BytesIO()
    image[0].save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

def generate_captcha():
    # 生成验证码图片
    size = (120, 30)
    image = Image.new('RGB', size, color='white')
    draw = ImageDraw.Draw(image)
    font_size = 15
    font = ImageFont.truetype("arial.ttf", font_size)

    captcha_text = ''.join(random.choices('ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789', k=4))
    draw.text((10, 10), captcha_text, font=font, fill='black')

    return image, captcha_text

@app.route("/logout")
def logout():
    # 清除认证的 cookie，并重定向到首页
    response = make_response(redirect(url_for("index")))
    response.delete_cookie("authenticated")
    return response

if __name__ == "__main__":
    app.run(debug=True)
