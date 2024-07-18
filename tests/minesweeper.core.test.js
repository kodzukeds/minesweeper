import { loadFeature, defineFeature } from 'jest-cucumber';
import * as steps from './steps/minesweeper.steps'

const feature = loadFeature('./tests/features/minesweeper.core.feature')

defineFeature(feature, (test) => {
  
  test('Starting game - Minefield default sizing 9x9', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then(/^the minefield should have "(.*)" rows and "(.*)" columns$/, (numberOfRows, numberOfCols) => {
      expect(steps.mineFieldDimensionsValidation(numberOfRows, numberOfCols)).toBe(true)
    })
  })

  test('Starting game - All the cells should be covered', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then('all the cells should be covered', () => {    
      expect(steps.areAllCellsCovered()).toBe(true)
    })
  })

  test('Starting game - All the cells should be enabled', ({ given, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    then('all the cells should be enabled', () => {    
      expect(steps.areAllCellsEnabled()).toBe(true)
    })
  })

  test('Uncovering a cell with the mouse - Using mouse left click', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player left clicks on the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should be uncovered$/, (rowPosition, colPosition) => {
      expect(steps.isCellUncovered(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering a cell - Disabling the cell', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should be disabled$/, (rowPosition, colPosition) => {
      expect(steps.isCellDisabled(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering a cell with a mine - Losing the game', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then('the player should lose the game', () => {    
      expect(steps.hasHighlightedMine()).toBe(true)
    })
  })

  test('Uncovering a cell with a mine - Showing a highlighted mine', ({ given, when, then }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      steps.setMockData(docString)
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (rowPosition, colPosition) => {
      steps.uncoverCell(rowPosition, colPosition)
    })
    then(/^the cell \("(.*)","(.*)"\) should show a highlighted mine$/, (rowPosition, colPosition) => {
      expect(steps.isHighlightedMine(rowPosition, colPosition)).toBe(true)
    })
  })

  test('Uncovering an empty cell - Uncovering neighbor cells', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      pending()
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then('the minefield should look like this', (docString) => {
      pending()
    })
  });

  test('Suspecting that a cell is hiding a mine - Tagging as mined', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    when(/^the player tags as "(.*)" the cell \("(.*)","(.*)"\)$/, (arg0, arg1, arg2) => {
      pending()
    })
    then(/^the cell \("(.*)","(.*)"\) should show mined$/, (arg0, arg1) => {
      pending()
    })
  });

  test('Untagging the mined tag - Removing the mined symbol', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given(/^the player tags as "(.*)" the cell \("(.*)","(.*)"\)$/, (arg0, arg1, arg2) => {
      pending()
    })
    when(/^the player untags the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then(/^the cell \("(.*)","(.*)"\) should not show "(.*)"$/, (arg0, arg1, arg2) => {
      pending()
    })
  })

  test('Tagging a cell as mined using the mouse - Using mouse right click', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    when(/^the player right clicks on the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then(/^the cell \("(.*)","(.*)"\) should show mined$/, (arg0, arg1) => {
      pending()
    })
  })

  test('Untagging a mined cell using the mouse - Using mouse right click twice', ({ given, when, and, then, pending }) => {  
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given(/^the player tags as "(.*)" the cell \("(.*)","(.*)"\)$/, (arg0, arg1, arg2) => {
      pending()
    })
    when(/^the player right clicks on the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    and(/^the player right clicks on the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then(/^the cell \("(.*)","(.*)"\) should not show "(.*)"$/, (arg0, arg1, arg2) => {
      pending()
    })
  })

  test('Discovering all the cells without mines - Winning the game', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      pending()
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then('the player should win the game', () => {     
      pending()
    })
  })

  test('Uncovering a cell with no mine - Displaying the number of adjacent mines', ({ given, when, then, pending }) => {     
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given(/^the player loads the following mock data (.*)$/, (arg0) => {
      pending()
    })
    when(/^the player uncovers the cell \("(.*)","(.*)"\)$/, (arg0, arg1) => {
      pending()
    })
    then(/^the hide \("(.*)","(.*)"\) should hide the number: (.*)$/, (arg0, arg1, arg2) => {
      pending()
    })
  })

  test('Uncovering a cell with no mine or mines around it - Displaying an empty cell', ({ given, when, then, pending }) => { 
    given('the player opens the game', () => {
      psteps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      pending()
    })
    when(/^the player uncovers the cell \((.*),(.*)\)$/, (arg0, arg1) => {
      pending()
    })
    then(/^the cell \("(.*)","(.*)"\) should show empty$/, (arg0, arg1) => {
      pending()
    })
  })

  test('Finishing game, disabling all the cells', ({ given, when, then, pending }) => {
    given('the player opens the game', () => {
      steps.openTheGame()
    })
    given('the player loads the following mock data', (docString) => {
      pending()
    })
    when(/^the player uncovers the cell \((.*),(.*)\)$/, (arg0, arg1) => {
      pending()
    })
    then('all the cells should be disabled', () => {   
      pending()
    })
  })

})

