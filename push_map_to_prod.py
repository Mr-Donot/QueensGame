import json

fichier_json = 'generated_maps/maps.json'
#PUSH ON THE WEB SITE
def json_to_js(json_file, js_file):
    with open(json_file, 'r') as f:
        data = json.load(f)

    with open(js_file, 'w') as f:
        f.write(f"const maps = {json.dumps(data, indent=4)};")


js_file = 'script/maps.js'
json_to_js(fichier_json, js_file)