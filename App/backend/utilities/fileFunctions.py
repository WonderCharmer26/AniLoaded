def ext_from_filename(name: str) -> str:
    """helper to get file type from file name"""
    if "." not in name:
        return ""
    return "." + name.split(".", 1)[-1].lower()
