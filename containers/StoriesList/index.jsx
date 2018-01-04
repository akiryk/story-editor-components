/**
 * Table for displaying lists of stories
 * See documentation for react-bootstrap-table:
 * http://allenfang.github.io/react-bootstrap-table
 */
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { getStories } from '../../state/reducers'

import CustomToolbar from './CustomToolbar'
import CustomPagination from './CustomPagination'
import StoryFilters from './Filters/StoryFilters'
import StoryFormatter from './StoryFormatter'

import sorters from '../../utils/sortHelpers'
import {sortAlphabetAsc, sortAlphabetDesc} from '../../utils/sortHelpers'
import styles from './tablestyle.css'

const StoriesList = ({ storyList }) => {

  /**
   * Custom configuration for react bootstrap table.
   */
  const bootstrapTableOptions = {
    toolBar: CustomToolbar,
    paginationPanel: CustomPagination,
    sizePerPage: 10,
    noDataText: 'No stories match the search term(s) or filters.',
  }

  /**
   * Custom callback function for formatting bylines.
   * Add a comma between names when there is more than byline.
   * @param {Array}
   * @return {String}
   */
  const bylineFormatter = (bylines) => (
    bylines.map((byline) => (byline.text)).join(', ')
  )

  /**
   * Return the last name from a multipart name
   * @param {object} story
   * @return {string} A name
   */
  const lastName = (story) => (
    story.byline.length
      ? story.byline[0].text.split(' ').slice(-1)[0]
      : ''
  )

  /**
   * Custom callback function for sorting bylines.
   * Sort bylines alphabetically by lastname, using the
   * first byline in the array.
   * @param {object} storyA, story object
   * @param {object} storyB, story object
   * @param {string} order, 'asc' or 'desc'
   * @return {bool}
   */
  const bylineSortFunc = (storyA, storyB, order) => (
    (order === 'desc')
      ? sortAlphabetDesc(lastName(storyA), lastName(storyB))
      : sortAlphabetAsc(lastName(storyA), lastName(storyB))
  )

  return (
    <div className={styles.grid}>
      <h1 className={styles.pageTitle}>Stories</h1>
      <StoryFilters />
      <BootstrapTable
        bordered={false}
        className={`table-sm ${styles.data}`}
        data={storyList}
        headerContainerClass="thead-default"
        options={bootstrapTableOptions}
        pagination
        ignoreSinglePage
        striped
        search
        searchPlaceholder='Search Titles'
      >
        <TableHeaderColumn
          isKey
          dataField="headline"
          dataFormat={StoryFormatter}
          dataSort
          height="100px"
          width="55%"
        >Story Title
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="byline"
          dataFormat={bylineFormatter }
          dataSort
          sortFunc={ bylineSortFunc }
          width="20%"
        >Byline
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="modified"
          dataSort
          width="25%"
        >Last Modified
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  )

}

StoriesList.propTypes = {
  storyList: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    storyList: getStories(state)
})

export default connect(mapStateToProps)(StoriesList)
