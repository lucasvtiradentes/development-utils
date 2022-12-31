
- Step1: Open powersheel as admin
> `Get-ExecutionPolicy`
> 
	`Set-ExecutionPolicy AllSigned`
	
- Step2: Install chocolatey and dependencies
> `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('[https://chocolatey.org/install.ps1')](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbEZuclRncmJhSHRjNTY0SVhnTGE4M2N3VEZtQXxBQ3Jtc0trVm5lbEpxS2lURi0wNUp1Q0tXZWdBRWdDV0xiOEE3YUdJS3NGbGxETG5VTldLOUpwcDNpY1hzOVpHMGI3T0IydGV6dnZBa0pSR0ZkazQ2eXp3ZENTNEZoVm1LMlZXeDRxbmlsOURUWHZRUzRoSjZRRQ&q=https%3A%2F%2Fchocolatey.org%2Finstall.ps1%27%29&v=4_zDCS2fVAU))`
> 
> `choco install -y nodejs-lts openjdk11`
> 
> `npm install --global yarn`
> 
> `yarn global bin`
> `# copy the location generated as we will need it latter`

- Step3: Add env variables
> `ANDROID_HOME -> C:\Android\sdk`
> `JAVA_HOME  -> C:\Program Files\Java\jre1.8.0_351`

- Step3: Add env to path
> `%ANDROID_HOME%\emulator`
> `%ANDROID_HOME%\tools`
> `%ANDROID_HOME%\tools\bin`
> `%ANDROID_HOME%\platform-tools`

- Step4: Install android studio

