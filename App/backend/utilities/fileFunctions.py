# helper to get file name
def ext_from_filename(name: str) -> str:
    if "." not in name:
        return ""
    return "." + name.split(".", 1)[-1].lower()
