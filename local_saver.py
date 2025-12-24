from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os

class SaveHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        # Налаштування CORS, щоб браузер дозволив запит
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        filename = data.get('filename')
        content = data.get('content')

        # Захист: зберігаємо тільки в папку data
        if not filename.startswith('data/'):
            filename = os.path.join('data', os.path.basename(filename))

        try:
            # Створюємо папку data, якщо її немає
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok'}).encode())
            print(f"✅ Файл збережено: {filename}")
            
            # 🚀 Автоматичний push на GitHub
            import subprocess
            import threading
            def auto_push():
                try:
                    print("🌐 Запуск auto_push на GitHub...")
                    subprocess.run(["python", "auto_push.py", f"Auto-save: {filename}"], 
                                   capture_output=True, text=True)
                    print("✅ Зміни відправлено на GitHub!")
                except Exception as e:
                    print(f"⚠️ Не вдалося відправити на GitHub: {e}")
            
            # Запускаємо push в окремому потоці, щоб не блокувати сервер
            threading.Thread(target=auto_push, daemon=True).start()
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
            print(f"❌ Помилка збереження: {e}")

def run(port=5005):
    server_address = ('', port)
    httpd = HTTPServer(server_address, SaveHandler)
    print(f"🚀 Локальний сервер збереження запущено на http://localhost:{port}")
    print("Тримайте це вікно відкритим під час роботи в адмінці.")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
