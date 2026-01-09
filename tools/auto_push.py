import subprocess
import sys
import datetime
import os

# Fix for Windows console encoding
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def run_git_commands():
    try:
        print("[SYNC] Починаю процес оновлення GitHub...")

        print("[1/3] Додавання файлів...")
        subprocess.run(["git", "add", "."], check=True)

        # Перевіряємо чи є зміни
        status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True).stdout.strip()
        
        if not status:
            print("[OK] Немає нових змін для збереження.")
        else:
            commit_message = f"Auto-update: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            if len(sys.argv) > 1:
                commit_message = " ".join(sys.argv[1:])
            
            print(f"[2/3] Commit: {commit_message}")
            subprocess.run(["git", "commit", "-m", commit_message], check=True)

        print("[3/3] Push to GitHub...")
        subprocess.run(["git", "push"], check=True)

        print("[SUCCESS] Sync complete!")
        
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Git command failed: {e}")
    except Exception as e:
        print(f"[ERROR] Unexpected: {e}")

if __name__ == "__main__":
    run_git_commands()
    if len(sys.argv) == 1:
        input("\nPress Enter to exit...")
