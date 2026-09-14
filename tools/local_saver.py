from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

class SaveHandler(SimpleHTTPRequestHandler):
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

        # Захист: зберігаємо тільки в дозволені папки (data або images)
        is_allowed = any(filename.startswith(p) for p in ['data/', 'images/'])
        if not is_allowed:
            filename = os.path.join('data', os.path.basename(filename))

        try:
            # Створюємо папку, якщо її немає
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            
            # Якщо контент - це base64 зображення (data:image/...), зберігаємо як бінарний файл
            if isinstance(content, str) and content.startswith('data:') and ';base64,' in content:
                print(f"📦 Отримано бінарні дані для: {filename}")
                import base64
                header, encoded = content.split(';base64,', 1)
                binary_data = base64.b64decode(encoded)
                with open(filename, 'wb') as f:
                    f.write(binary_data)
            else:
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
                    result = subprocess.run(
                        ["python", "tools/auto_push.py", f"Auto-save: {filename}"],
                        capture_output=True, text=True, timeout=60
                    )
                    # Показуємо вивід у консолі Local Saver
                    if result.stdout:
                        print(result.stdout)
                    if result.stderr:
                        print(f"⚠️ Stderr: {result.stderr}")
                    if result.returncode == 0:
                        print("✅ GitHub sync OK!")
                    else:
                        print(f"❌ Push failed (code {result.returncode})")
                except subprocess.TimeoutExpired:
                    print("⏱️ Timeout: auto_push took too long")
                except Exception as e:
                    print(f"⚠️ Помилка push: {e}")
            
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
