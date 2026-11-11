*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        https://www.selenium.dev/selenium/web/web-form.html
${BROWSER}    chrome

*** Test Cases ***
The Web Form Opens
    [Documentation]    Open the web form and check its title.
    Open Browser    ${URL}    ${BROWSER}
    Title Should Be    Web form
    [Teardown]    Close Browser
