/// <reference types="cypress" />
import {recurse} from 'cypress-recurse'

export class computerDatabasePage {
  private readonly searchbox
  private readonly filterByNameButton
  private readonly computersTableContent
  private readonly warningBanner
  private readonly createComputerButton
  private readonly nextPageButton

  constructor(){
    this.searchbox = '#searchbox'
    this.filterByNameButton = "#searchsubmit"
    this.computersTableContent = "table tbody"
    this.warningBanner = ".alert-message"
    this.createComputerButton = "#add"
    this.nextPageButton = ".next"
  }

  /**
   * The `navigate` function visits a specific URL.
   */
  navigate(){
    cy.visit('https://computer-database.gatling.io/computers')
  }

  /**
   * The function types the given search string into the search box.
   * @param {string} search - The search parameter is a string that represents the text that will be
   * typed into the search box.
   */
  typeInSearchBox( search:string ){
    cy.log('Type search')
    cy.get(this.searchbox).type( search )
  }

  /**
   * The function clicks on a button to filter by name.
   */
  clickFilterNameButton(){
    cy.log('Click Filter Name Button')
    cy.get(this.filterByNameButton).click()
  }

  /**
   * The function returns the content of the computer table.
   * @returns The content of the computer table.
   */
  getComputerTableContent(){
    cy.log('Return computer table locator')
    return this.computersTableContent
  }

  /**
   * The function validates that the warning banner contains the specified text.
   * @param {string} text - The `text` parameter is a string that represents the expected text content
   * of the warning banner.
   */
  validateWarningBannerContains(text:string){
    cy.get(this.warningBanner).should("include.text", text)
  }

  /**
   * The function clicks on a button to add a computer.
   */
  clickButtonAdd(){
    cy.get(this.createComputerButton).click()
  }

  /**
   * The function `goToLastPage` recursively clicks on the next page button until it reaches the last
   * page.
   */
  goToLastPage(){
    recurse(
      () => cy.get(this.nextPageButton),
      ($btn) => $btn.hasClass('disabled') === true,
      {
        post() {
          cy.get('.next a').click()
        }
      }
    )
  }
}