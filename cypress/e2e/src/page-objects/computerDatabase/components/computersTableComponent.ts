/// <reference types="cypress" />

export class computersTableComponent {
  private container
  private readonly rows

  constructor(container){
    this.container = container
    this.rows = 'tr'
  }

  /**
   * The function `clickRowByName` finds a row in a table by name and clicks on the first link in that
   * row.
   * @param {string} name - The name parameter is a string that represents the name of the row you want
   * to click on.
   */
  clickRowByName(name:string){
    cy.get(this.container).within(($table) => {
      cy.contains(name)
      .parents(this.rows)
      .within(() => {
        cy.get('td').eq(0).within(() => {
          cy.get('a').click()
        })
      })
    })
  }

  printMapWithResults(){
    let map = new Map()
    cy.get(this.container).within(($table) => {
      cy.get(this.rows)
      .each(($row) => {
        let key
        let values = []
        cy.wrap($row).within(($row) => {
          cy.wrap($row).get('td').eq(0).then(($val) => key=$val.text())
          cy.wrap($row).get('td').eq(1).then(($val) => values.push($val.text()))
          cy.wrap($row).get('td').eq(2).then(($val) => values.push($val.text()))
          cy.wrap($row).get('td').eq(3).then(($val) => values.push($val.text()))
        })
        .then(_ => {
          map.set(key,values)
        })
      })
    })
    .then(() => {
      map.forEach((value, key) => {
        cy.log(key,value)
      })
    })
  }
}