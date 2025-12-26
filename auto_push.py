import subprocess
import sys
import datetime

def run_git_commands():
    try:
        # 1. Повідомлення про початок
        print("🚀 Починаю процес оновлення GitHub...")

        # 2. git add .
        print("📁 Крок 1: Додавання файлів...")
        subprocess.run(["git", "add", "."], check=True)

        # Перевірка на конфлікти
        conflicts = subprocess.run(["git", "diff", "--name-only", "--diff-filter=U"], capture_output=True, text=True).stdout.strip()
        if conflicts:
            print(f"⚠️ Виявлено конфлікти у файлах:\n{conflicts}")
            print("Спробуйте вирішити їх вручну або зверніться до розробника.")
            return

        # 3. git commit
        commit_message = f"Auto-update: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        if len(sys.argv) > 1:
            # Якщо передано аргументи, склеюємо їх (корисна мітка для автозбереження)
            commit_message = " ".join(sys.argv[1:])
        
        print(f"📝 Крок 2: Збереження (commit)...")
        # Перевіряємо чи є зміни
        status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True).stdout.strip()
        if not status:
            print("✨ Немає нових змін для збереження.")
        else:
            print(f"📝 Комміт: '{commit_message}'")
            subprocess.run(["git", "commit", "-m", commit_message], check=True)

        # 4. git push
        print("☁️ Крок 3: Відправка на GitHub...")
        subprocess.run(["git", "push"], check=True)

        print("\n✅ Успішно оновлено!")
        
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Помилка під час виконання команди: {e}")
        print("Переконайтеся, що Git встановлений і ви знаходитесь в папці репозиторію.")
    except Exception as e:
        print(f"\n❌ Виникла непередбачена помилка: {e}")

if __name__ == "__main__":
    run_git_commands()
    # Тримаємо вікно відкритим лише при ручному запуску (без аргументів)
    if len(sys.argv) == 1:
        input("\nНатисніть Enter для виходу...")
