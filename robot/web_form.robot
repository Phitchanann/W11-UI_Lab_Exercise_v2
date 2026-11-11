*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        https://www.selenium.dev/selenium/web/web-form.html
${BROWSER}    chrome

*** Test Cases ***
The Web Form Opens
    [Documentation]    Open the web form and check its title.
    Open Browser    ${URL}    ${BROWSER}    service=executable_path=r'%{CHROMEDRIVER}'
    Title Should Be    Web form
    [Teardown]    Close Browser

Submit The Web Form
    [Documentation]    Fill the text and select fields, submit, and verify the result.
    Open Browser    ${URL}    ${BROWSER}    service=executable_path=r'%{CHROMEDRIVER}'
    Input Text    id:my-text-id    Hello Selenium
    Select From List By Label    name:my-select    Two
    Click Button    xpath://button[@type='submit']
    Wait Until Element Is Visible    id:message
    Title Should Be    Web form - target page
    Element Text Should Be    id:message    Received!
    [Teardown]    Close Browser
