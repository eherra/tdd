*** Settings ***
Library   SeleniumLibrary


*** Variables ***
${URL}              http://localhost:3000/
${BROWSER}          Chrome

*** Test Cases ***

User Can View Frontpage
    Open Browser    ${URL}    ${BROWSER} 
    Wait Until Page Contains    Hello Todo app