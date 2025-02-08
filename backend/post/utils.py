from subprocess import check_output, CalledProcessError, STDOUT

def get_video_duration(filename: str) -> float:
    command = [
        'ffprobe',
        '-v',
        'error',
        '-show_entries',
        'format=duration',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        filename
    ]

    try:
        output = check_output(command, stderr=STDOUT).decode()
    except CalledProcessError as e:
        output = e.output.decode()

    return float(output)