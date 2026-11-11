*** Settings ***
Documentation     Test case QP-01, A custom pizza reaches the admin list.
Resource          resources/quickpizza.resource
Library           DateTime
Test Teardown     Close Browser

*** Test Cases ***
QP-01 A Custom Pizza Reaches The Admin List
    [Documentation]    A pizza request with restrictions keeps them, rating needs login, and admin sees the pizza.
    # Step 1: open QuickPizza
    Open QuickPizza
    # Step 2: reveal advanced fields
    Turn On Advanced
    # Step 3: enter restrictions and unique name
    ${stamp}=    Get Current Date    result_format=%Y%m%d-%H%M%S
    ${name}=    Set Variable    Lab Pizza ${stamp}
    Fill In The Pizza Request    600    Knife    ${name}
    Capture Page Screenshot    qp01-step3-fields.png
    # Step 4: request a pizza and check restrictions
    Ask For A Pizza
    ${tool}=    Recommendation Should Keep The Restrictions    ${name}    Knife    600
    Capture Element Screenshot    id:recommendations    qp01-step4-pizza.png
    # Step 5: rating requires login
    Rate The Pizza Without Logging In
    Capture Page Screenshot    qp01-step5-login-needed.png
    # Step 6: sign in as admin
    Log In As Admin    admin    admin
    # Step 7: find the pizza and compare its tool
    Admin List Should Show The Pizza    ${name}    ${tool}
    Capture Page Screenshot    qp01-step7-admin-list.png
