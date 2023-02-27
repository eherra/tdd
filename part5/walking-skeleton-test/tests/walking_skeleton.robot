*** Settings ***
Library   SeleniumLibrary


*** Variables ***
${URL}              http://localhost:3000/
${BROWSER}          Chrome


*** Test Cases ***
User Can View Frontpage
    Open Browser    ${URL}    ${BROWSER} 
    Wait Until Page Contains    To-Do App
    Input Text    //*[@id=":r0:"]    testTodo
    Click Button    //*[@id="root"]/div/form/div/div/span/button
    Wait Until Page Contains    testTodo
    Click Button     //*[@id="mark-completed-button"]
    Click Button    //*[@id="rename-button"]
    Wait Until Page Contains Element    //*[@id=":r1:"]
    Input Text    //*[@id=":r1:"]   newNameTodo
    Click Element       //*[@id="renameTodoButton"]
    Close Browser
    