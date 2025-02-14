# Testing
For local testing I use [act tool](https://github.com/nektos/act). 
# Requirements
1. Install act tool via website: [documentation](https://nektosact.com/installation/index.html)
2. Create .env file with correct LANGUAGE:
```dotenv
LANGUAGE='en'
```
or 
```dotenv
LANGUAGE='pl'
```
3. Run act:
```bash
 act -j html_to_pdf --artifact-server-path /path/where/save/resume/on/the/same/disk/as/repository/be/
```

example for Windows:
```bash
 act -j html_to_pdf --artifact-server-path C:\Resume
```

[Return to Readme](README.md)
