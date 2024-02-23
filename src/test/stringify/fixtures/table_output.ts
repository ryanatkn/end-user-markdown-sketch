/*

Adapted from MDsveX: <https://github.com/pngwn/MDsveX>

MIT License

Copyright (c) 2020 pngwn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

export const table_output =
	"<script >\n  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';\n  import { classnames } from '../../helpers/classnames';\n  import orderBy from 'lodash/orderBy';\n  import Pagination from '../Pagination/Pagination.svelte';\n  import Spinner from '../Spinner/Spinner.svelte';\n\n  const dispatch = createEventDispatcher();\n\n  let tableData = undefined;\n\n  export let isLoading = false;\n  export let hasBorder = false;\n  export let isRowClickable = false;\n  export let activeSort = undefined;\n  export let activeSortDirection = undefined;\n  export let currentPage = 1;\n  export let pageSize = 10;\n  export let isDynamic = false;\n  export let columns = [];\n  export let showHeader = true;\n  export let noResultsMessage = 'No results available';\n  export let hasPagination = false;\n  export let itemTotal = 0;\n  export let data = [];\n  export let rowCssClass = () => {};\n\n  let ClassNames;\n\n  $: {\n    ClassNames = classnames({\n      hasBorder,\n      isLoading,\n      isRowClickable,\n      noHeader: !showHeader\n    });\n  }\n\n  $: {\n    if(data) {\n      tableData = data;\n    }\n  }\n\n  $: {\n    itemTotal = isDynamic ? itemTotal : data.length;\n  }\n\n  let Data;\n\n  $: {\n    if (!tableData) {\n      Data = [];\n    } else if (isDynamic) {\n      Data = tableData;\n    } else {\n      let processedData = tableData;\n\n      if (activeSort) {\n        processedData = orderBy(tableData, activeSort, activeSortDirection);\n      }\n\n      const currentPageSize = pageSize || processedData.length;\n\n      Data = processedData.slice((currentPage * currentPageSize) - currentPageSize, currentPage * currentPageSize);\n    }\n  }\n\n  export function sort(selectedHeaderItem) {\n    const currentActiveSort = activeSort;\n    const currentDirection = activeSortDirection;\n    const dataLookup = typeof selectedHeaderItem.cell === 'string' ? selectedHeaderItem.cell : '';\n    const selectedSort = typeof selectedHeaderItem.sort === 'boolean' ? dataLookup : selectedHeaderItem.sort;\n\n    let newActiveSort = null;\n    let newSortDirection = null;\n\n    if (currentActiveSort !== selectedSort) {\n      newActiveSort = selectedSort;\n      newSortDirection = 'asc';\n    } else {\n\n      if (!currentDirection) {\n        newSortDirection = 'asc';\n      } else if (currentDirection === 'asc') {\n        newSortDirection = 'desc';\n      } else {\n        newSortDirection = null;\n      }\n\n      newActiveSort = newSortDirection ? currentActiveSort : null;\n    }\n\n    activeSort = newActiveSort, activeSortDirection = newSortDirection;\n\n    onChange();\n  }\n\n  function onChange() {\n    dispatch('change', {\n      currentPage,\n      pageSize,\n      activeSort,\n      activeSortDirection\n    });\n  }\n\n  function onRowClick(rowItem) {\n    dispatch('rowClick', rowItem);\n  }\n\n  function colWidth(col) {\n    return col.width ? `width:${col.width};min-width:${col.width};` : '';\n  }\n\n  function cellAlign(cell) {\n    return cell.align ? `text-align:${cell.align};` : '';\n  }\n\n  function sortClassNames(sort, lookup, activeSort, activeSortDirection) {\n    const dataLookup = typeof lookup === 'string' ? lookup : '';\n    const actualSort = typeof sort === 'boolean' ? dataLookup : sort;\n\n    return classnames({\n      'sort-asc': actualSort === activeSort && activeSortDirection === 'asc',\n      'sort-desc': actualSort === activeSort && activeSortDirection === 'desc'\n    });\n  }\n\n\n  let previous = false;\n  let data_prev = undefined;\n\n  onMount(() => {\n    isRowClickable = !!arguments[0].$$.callbacks.rowClick;\n  });\n</script>\n\n<style >\n  .wrapper {\n    position: relative;\n  }\n\n  .table.hasBorder {\n    border: 1px solid #EBEDEF;\n    border-radius: 4px;\n  }\n\n  .isLoading {\n    min-height: 150px;\n    opacity: 0.6;\n  }\n\n  .loader {\n    cursor: wait;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n\n  .loader_spinner {\n    color: var(--green_4, #51ce6c);\n    width: 25px;\n    height: 25px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin: -25px 0 0 -25px;\n  }\n\n  .pagination {\n    padding: 20px 0;\n  }\n\n  table {\n    border: none;\n    border-collapse: collapse;\n    table-layout: fixed;\n    width: 100%;\n  }\n\n  table thead th {\n    border-bottom: 1px solid var(--neutral_0);\n    box-sizing: border-box;\n    color: var(--neutral_6);\n    font-size: 12px;\n    font-weight: 600;\n    padding: 15px 28px;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .sort {\n    display: inline-block;\n    cursor: pointer;\n    -webkit-touch-callout: none;\n    user-select: none;\n    position: relative;\n  }\n\n  .sort::after,\n  .sort::before {\n    border-width: 3px;\n    border-style: solid;\n    display: block;\n    height: 0;\n    position: absolute;\n    right: -11px;\n    width: 0;\n    content: \" \";\n  }\n\n  .sort::before {\n    border-color: transparent transparent rgba(0, 0, 0, 0.2);\n    bottom: 8px;\n  }\n\n  .sort:hover::before {\n    border-color: transparent transparent rgba(0, 0, 0, 0.3);\n  }\n\n  .sort.sort-asc::before {\n    border-color: transparent transparent rgba(0, 0, 0, 0.6);\n  }\n\n  .sort::after {\n    border-color: rgba(0, 0, 0, 0.2) transparent transparent;\n    bottom: 0;\n  }\n\n  .sort:hover::after {\n    border-color: rgba(0, 0, 0, 0.3) transparent transparent;\n  }\n\n  .sort.sort-desc::after {\n    border-color: rgba(0, 0, 0, 0.6) transparent transparent;\n  }\n\n  .isRowClickable tbody tr:not(.noResultsMessage) {\n    cursor: pointer;\n    transition: all 0.15s;\n  }\n\n  .isRowClickable tbody tr:not(.noResultsMessage):hover {\n    background-color: var(--blue_0);\n  }\n\n  table tbody td {\n    color: var(--neutral_6);\n    border-bottom: 1px solid var(--neutral_0);\n    box-sizing: border-box;\n    font-size: 13px;\n    padding: 18px 28px;\n    text-align: left;\n    vertical-align: middle;\n  }\n\n  .hasBorder tr:last-of-type td {\n    border-bottom: none;\n  }\n\n  .hasBorder thead tr:first-child th:first-child,\n  .hasBorder.noHeader tbody tr:first-child td:first-child {\n    border-top-left-radius: 4px;\n  }\n\n  .hasBorder thead tr:first-child th:last-child,\n  .hasBorder.noHeader tbody tr:first-child td:last-child {\n    border-top-right-radius: 4px;\n  }\n\n  .hasBorder tbody tr:last-child td:first-child {\n    border-bottom-left-radius: 4px;\n  }\n\n  .hasBorder tbody tr:last-child td:last-child {\n    border-bottom-right-radius: 4px;\n  }\n</style>\n\n\n<div \nclass=\"wrapper\"\n>\n  <div \nclass=\"table { ClassNames }\"\n>\n    <table >\n\n      <colgroup >\n        {#each columns as col }\n        <col \nstyle=\"{ colWidth(col) }\"\n/>\n        {/each}\n      </colgroup>\n\n      {#if showHeader }\n      <thead >\n        <tr >\n          {#each columns as headerItem }\n          <th \nstyle=\"{ cellAlign(headerItem) }\"\n>\n            {#if headerItem.sort }\n            <span \non:click=\"{() => sort(headerItem)}\"\nclass=\"sort { sortClassNames(headerItem.sort, headerItem.cell, activeSort, activeSortDirection) }\"\n>\n              {#if headerItem.title.component }\n              <svelte:component \nthis=\"{headerItem.title.component}\"\n{...headerItem.title.props}\n/>\n              {:else }\n              {@html headerItem.title }\n              {/if}\n            </span>\n            {:else }\n            {#if headerItem.title.component }\n            <svelte:component \nthis=\"{headerItem.title.component}\"\n{...headerItem.title.data}\n/>\n            {:else }\n            {@html headerItem.title }\n            {/if}\n            {/if}\n          </th>\n          {/each}\n        </tr>\n      </thead>\n      {/if}\n      <tbody >\n        {#if Data.length <= 0 && !isLoading } \n          <tr \nclass=\"noResultsMessage\"\n>\n            <td \ncolspan=\"{ columns.length }\"\n>\n              <slot \nname=\"noResults\"\n>{noResultsMessage }</slot>\n            </td>\n          </tr>\n          {/if}\n\n          {#each Data as row }\n          <tr \nclass=\"{ rowCssClass ? rowCssClass(row) : '' }\"\non:click=\"{() => onRowClick(row)}\"\n>\n            {#each columns as item }\n            <td \nstyle=\"{ cellAlign(item) }\"\n>\n              {#if typeof item.cell === 'function' }\n              {@html item.cell(row) }\n              {:else if item.cell.component }\n              <svelte:component \nthis=\"{item.cell.component}\"\n{...item.cell.props}\nitem=\"{row}\"\n/>\n              {:else }\n              {@html row[item.cell] }\n              {/if}\n            </td>\n            {/each}\n          </tr>\n          {/each}\n      </tbody>\n    </table>\n  </div>\n\n  {#if hasPagination }\n  {#if itemTotal > 0 && currentPage > 0 }\n  <div \nclass=\"pagination\"\n>\n    <Pagination \non:change=\"{onChange}\"\nbind:pageSize=\"{pageSize}\"\nbind:current=\"{currentPage}\"\ntotal=\"{ itemTotal }\"\n>\n    </Pagination>\n  </div>\n  {/if}\n  {/if}\n \n  {#if isLoading }\n  <div \nclass=\"loader\"\n>\n    <div \nclass=\"loader_spinner\"\n>\n      <Spinner ></Spinner>\n    </div>\n  </div>\n  {/if}\n</div>";