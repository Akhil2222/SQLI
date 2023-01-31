import os
bash_profile = open('/Users/'+ os.environ['USER']+'/.bash-profile','w')
bash_profile.write('''export fileName=aa.cs
function epl() {
 export fileName=$1
 python3 "/Users/akhily/Documents/projects that i can acsess/2023-01-10/FOLDERS/E/EPL/int.py"
}''')
os.system('source ~/.bash-profile')