import { computersTableComponent } from "../page-objects/computerDatabase/components/computersTableComponent";
import { computerDatabasePage } from "../page-objects/computerDatabase/pages/computerDatabasePage";
import { createEditComputerPage } from "../page-objects/computerDatabase/pages/createEditComputerPage";
const computerDatabase = new computerDatabasePage()
const editComputer = new createEditComputerPage()

describe('Computer Database Page functionalities', () => {
  beforeEach(() => {
    computerDatabase.navigate()
  })

  it('edit Commodore 64', () => {
    computerDatabase.typeInSearchBox('Commodore 64')
    computerDatabase.clickFilterNameButton()
    const computersTableContent = new computersTableComponent(computerDatabase.getComputerTableContent())
    computersTableContent.clickRowByName('Commodore 64')
    editComputer.selectCompany('Nokia')
    editComputer.clickSaveButton()
    computerDatabase.validateWarningBannerContains("Computer Commodore 64 has been updated")
  })

  it('Leave empty name in edit page. Expect Error message', () => {
    computerDatabase.typeInSearchBox('Commodore 64')
    computerDatabase.clickFilterNameButton()
    const computersTableContent = new computersTableComponent(computerDatabase.getComputerTableContent())
    computersTableContent.clickRowByName('Commodore 64')
    editComputer.clearComputerName()
    editComputer.clickSaveButton()
    editComputer.validateErrorMessageEquals('Failed to refine type : Predicate isEmpty() did not fail.')
  })

  it('Map results for hp', () => {
    computerDatabase.typeInSearchBox('hp')
    computerDatabase.clickFilterNameButton()
    const computersTableContent = new computersTableComponent(computerDatabase.getComputerTableContent())
    computersTableContent.printMapWithResults()
  })

  it('Map results for IBM last page', () => {
    computerDatabase.typeInSearchBox('ibm')
    computerDatabase.clickFilterNameButton()
    computerDatabase.goToLastPage()
    const computersTableContent = new computersTableComponent(computerDatabase.getComputerTableContent())
    computersTableContent.printMapWithResults()
  })

  it('Create new computer', () => {
    computerDatabase.clickButtonAdd()
    editComputer.editComputerName('Test Computer')
    editComputer.editIntroduced('2000-10-11')
    editComputer.editDiscontinued('2004-12-31')
    editComputer.selectCompany('Evans & Sutherland')
    editComputer.clickCreateButton()
    computerDatabase.validateWarningBannerContains("Computer Test Computer has been created")
  })
})