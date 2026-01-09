@echo off
if not exist "archive_cleanup_2026" mkdir archive_cleanup_2026
if not exist "tools" mkdir tools
if not exist "docs" mkdir docs
move /Y admin.html archive_cleanup_2026\
move /Y designer.html archive_cleanup_2026\
move /Y engine.js archive_cleanup_2026\
move /Y matrix.css archive_cleanup_2026\
move /Y index_v2.html archive_cleanup_2026\
move /Y schema.js archive_cleanup_2026\
move /Y *.crswap archive_cleanup_2026\
move /Y "інші меблі.html" archive_cleanup_2026\
move /Y auto_push.py tools\
move /Y local_saver.py tools\
move /Y CLEAN_OLD_SCHEMAS.bat tools\
move /Y push.bat tools\
move /Y run_local_saver.bat tools\
move /Y "Fixing Admin UI Visibility.md" docs\
echo Done.
exit
