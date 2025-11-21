import basic
import sys

if len(sys.argv) > 1:
    try:
        with open(sys.argv[1], 'r') as f:
            script = f.read()
        result, error = basic.run(sys.argv[1], script)
        if error:
            print(error.as_string())

    except FileNotFoundError:
        print(f"File not found: '{sys.argv[1]}'")
else:
    while True:
        text = input('basic > ')
        if text.strip() == "": continue
        result, error = basic.run('<stdin>', text)

        if error:
            print(error.as_string())