import yaml

path = "codemagic.yaml"
with open(path, "r") as f:
lines = f.readlines()

new_lines = []
replaced = False

for i, line in enumerate(lines):
stripped = line.strip()
indent = line[:len(line) - len(line.lstrip())]
if stripped == 'sleep 5' and i + 1 < len(lines) and 'mkdir -p' in lines[i + 1]:
new_lines.append(indent + 'sleep 8\n')
replaced = True
elif 'ipad_launch_screenshot_5s.png' in line:
new_lines.append(line.replace('ipad_launch_screenshot_5s.png', 'ipad_launch_screenshot.png'))
elif stripped == 'echo "DEBUG: Screenshot iPad 5s capture avec succes"':
new_lines.append(indent + 'echo "DEBUG: Screenshot iPad capture avec succes"\n')
elif stripped == 'sleep 15':
pass
elif 'ipad_launch_screenshot_20s.png' in line:
pass
elif stripped == 'echo "DEBUG: Screenshot iPad 20s capture avec succes"':
pass
else:
new_lines.append(line)

print("sleep remplace:", replaced)

with open(path, "w") as f:
f.writelines(new_lines)
with open(path, "r") as f:
yaml.safe_load(f.read())
print("YAML valide et fichier sauvegarde")
