/// <reference types="cypress" />

export class createEditComputerPage {
  private readonly computerName
  private readonly companyDropdown
  private readonly introduced
  private readonly discontinued
  private readonly saveButton
  private readonly createButton
  private readonly warningMessage

  constructor(){
    this.computerName = '#name'
    this.introduced = '#introduced'
    this.discontinued = '#discontinued'
    this.companyDropdown = '#company'
    this.saveButton = 'input[value="Save this computer"]'
    this.createButton = 'input[value="Create this computer"]'
    this.warningMessage = '.clearfix.error span.help-inline'
  }

  /**
   * The function "editComputerName" is used to edit the name of a computer.
   * @param {string} name - The name parameter is a string that represents the new name for the
   * computer.
   */
  editComputerName(name:string){
    cy.log('Editing Name')
    cy.get(this.computerName).type(name)
  }

  /**
   * The function edits the "introduced" field by typing the provided value.
   * @param {string} introduced - The "introduced" parameter is a string that represents the value to
   * be typed into an input field.
   */
  editIntroduced(introduced:string){
    cy.log('Edit Introduced')
    cy.get(this.introduced).type(introduced)
  }

  /**
   * The function edits the "discontinued" field by typing the provided value.
   * @param {string} discontinued - The parameter "discontinued" is a string that represents the value
   * to be typed into an input field.
   */
  editDiscontinued(discontinued:string){
    cy.log('Edit discontinued')
    cy.get(this.discontinued).type(discontinued)
  }

  /**
   * The function clears the value of a computer name input field.
   * @param {string} name - The parameter "name" is a string that represents the name of the computer.
   */
  clearComputerName(){
    cy.log('Clearing Name')
    cy.get(this.computerName).clear()
  }
  
  /**
   * The function selects a company from a dropdown menu.
   * @param {string} company - The parameter "company" is a string that represents the name of the
   * company to be selected from a dropdown.
   */
  selectCompany(company:string){
    cy.log('Select Company from dropdown')
    cy.get(this.companyDropdown).select(company)
  }

  /**
   * The function clicks on the save button
   */
  clickSaveButton(){
    cy.log('Save Button')
    cy.get(this.saveButton).click()
  }

  /**
   * The function clicks on a create button and logs a message.
   */
  clickCreateButton(){
    cy.log('Create Button')
    cy.get(this.createButton).click()
  }

  /**
   * The function checks if a warning message contains a specific error message.
   * @param {string} error - The "error" parameter is a string that represents the expected error
   * message.
   */
  validateErrorMessageEquals(error:string){
    cy.get(this.warningMessage).should("contain.text", error)
  }
}