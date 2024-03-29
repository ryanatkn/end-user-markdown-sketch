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

export const table_without_positions = {
	type: 'root',
	children: [
		{
			type: 'svelte_script',
			tag: 'script',
			properties: [],
			selfclosing: false,
			children: [
				{
					type: 'text',
					value:
						"\n  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';\n  import { classnames } from '../../helpers/classnames';\n  import orderBy from 'lodash/orderBy';\n  import Pagination from '../Pagination/Pagination.svelte';\n  import Spinner from '../Spinner/Spinner.svelte';\n\n  const dispatch = createEventDispatcher();\n\n  let tableData = undefined;\n\n  export let isLoading = false;\n  export let hasBorder = false;\n  export let isRowClickable = false;\n  export let activeSort = undefined;\n  export let activeSortDirection = undefined;\n  export let currentPage = 1;\n  export let pageSize = 10;\n  export let isDynamic = false;\n  export let columns = [];\n  export let showHeader = true;\n  export let noResultsMessage = 'No results available';\n  export let hasPagination = false;\n  export let itemTotal = 0;\n  export let data = [];\n  export let rowCssClass = () => {};\n\n  let ClassNames;\n\n  $: {\n    ClassNames = classnames({\n      hasBorder,\n      isLoading,\n      isRowClickable,\n      noHeader: !showHeader\n    });\n  }\n\n  $: {\n    if(data) {\n      tableData = data;\n    }\n  }\n\n  $: {\n    itemTotal = isDynamic ? itemTotal : data.length;\n  }\n\n  let Data;\n\n  $: {\n    if (!tableData) {\n      Data = [];\n    } else if (isDynamic) {\n      Data = tableData;\n    } else {\n      let processedData = tableData;\n\n      if (activeSort) {\n        processedData = orderBy(tableData, activeSort, activeSortDirection);\n      }\n\n      const currentPageSize = pageSize || processedData.length;\n\n      Data = processedData.slice((currentPage * currentPageSize) - currentPageSize, currentPage * currentPageSize);\n    }\n  }\n\n  export function sort(selectedHeaderItem) {\n    const currentActiveSort = activeSort;\n    const currentDirection = activeSortDirection;\n    const dataLookup = typeof selectedHeaderItem.cell === 'string' ? selectedHeaderItem.cell : '';\n    const selectedSort = typeof selectedHeaderItem.sort === 'boolean' ? dataLookup : selectedHeaderItem.sort;\n\n    let newActiveSort = null;\n    let newSortDirection = null;\n\n    if (currentActiveSort !== selectedSort) {\n      newActiveSort = selectedSort;\n      newSortDirection = 'asc';\n    } else {\n\n      if (!currentDirection) {\n        newSortDirection = 'asc';\n      } else if (currentDirection === 'asc') {\n        newSortDirection = 'desc';\n      } else {\n        newSortDirection = null;\n      }\n\n      newActiveSort = newSortDirection ? currentActiveSort : null;\n    }\n\n    activeSort = newActiveSort, activeSortDirection = newSortDirection;\n\n    onChange();\n  }\n\n  function onChange() {\n    dispatch('change', {\n      currentPage,\n      pageSize,\n      activeSort,\n      activeSortDirection\n    });\n  }\n\n  function onRowClick(rowItem) {\n    dispatch('rowClick', rowItem);\n  }\n\n  function colWidth(col) {\n    return col.width ? `width:${col.width};min-width:${col.width};` : '';\n  }\n\n  function cellAlign(cell) {\n    return cell.align ? `text-align:${cell.align};` : '';\n  }\n\n  function sortClassNames(sort, lookup, activeSort, activeSortDirection) {\n    const dataLookup = typeof lookup === 'string' ? lookup : '';\n    const actualSort = typeof sort === 'boolean' ? dataLookup : sort;\n\n    return classnames({\n      'sort-asc': actualSort === activeSort && activeSortDirection === 'asc',\n      'sort-desc': actualSort === activeSort && activeSortDirection === 'desc'\n    });\n  }\n\n\n  let previous = false;\n  let data_prev = undefined;\n\n  onMount(() => {\n    isRowClickable = !!arguments[0].$$.callbacks.rowClick;\n  });\n",
					position: {
						start: {
							line: 1,
							column: 9,
							offset: 8,
						},
						end: {
							line: 137,
							column: 1,
							offset: 3486,
						},
					},
				},
			],
			position: {
				start: {
					line: 1,
					column: 1,
					offset: 0,
				},
				end: {
					line: 137,
					column: 10,
					offset: 3495,
				},
			},
		},
		{
			type: 'text',
			value: '\n\n',
			position: {
				start: {
					line: 137,
					column: 10,
					offset: 3495,
				},
				end: {
					line: 139,
					column: 1,
					offset: 3497,
				},
			},
		},
		{
			type: 'svelte_style',
			tag: 'style',
			properties: [],
			selfclosing: false,
			children: [
				{
					type: 'text',
					value:
						'\n  .wrapper {\n    position: relative;\n  }\n\n  .table.hasBorder {\n    border: 1px solid #EBEDEF;\n    border-radius: 4px;\n  }\n\n  .isLoading {\n    min-height: 150px;\n    opacity: 0.6;\n  }\n\n  .loader {\n    cursor: wait;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n  }\n\n  .loader_spinner {\n    color: var(--green_4, #51ce6c);\n    width: 25px;\n    height: 25px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin: -25px 0 0 -25px;\n  }\n\n  .pagination {\n    padding: 20px 0;\n  }\n\n  table {\n    border: none;\n    border-collapse: collapse;\n    table-layout: fixed;\n    width: 100%;\n  }\n\n  table thead th {\n    border-bottom: 1px solid var(--neutral_0);\n    box-sizing: border-box;\n    color: var(--neutral_6);\n    font-size: 12px;\n    font-weight: 600;\n    padding: 15px 28px;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .sort {\n    display: inline-block;\n    cursor: pointer;\n    -webkit-touch-callout: none;\n    user-select: none;\n    position: relative;\n  }\n\n  .sort::after,\n  .sort::before {\n    border-width: 3px;\n    border-style: solid;\n    display: block;\n    height: 0;\n    position: absolute;\n    right: -11px;\n    width: 0;\n    content: " ";\n  }\n\n  .sort::before {\n    border-color: transparent transparent rgba(0, 0, 0, 0.2);\n    bottom: 8px;\n  }\n\n  .sort:hover::before {\n    border-color: transparent transparent rgba(0, 0, 0, 0.3);\n  }\n\n  .sort.sort-asc::before {\n    border-color: transparent transparent rgba(0, 0, 0, 0.6);\n  }\n\n  .sort::after {\n    border-color: rgba(0, 0, 0, 0.2) transparent transparent;\n    bottom: 0;\n  }\n\n  .sort:hover::after {\n    border-color: rgba(0, 0, 0, 0.3) transparent transparent;\n  }\n\n  .sort.sort-desc::after {\n    border-color: rgba(0, 0, 0, 0.6) transparent transparent;\n  }\n\n  .isRowClickable tbody tr:not(.noResultsMessage) {\n    cursor: pointer;\n    transition: all 0.15s;\n  }\n\n  .isRowClickable tbody tr:not(.noResultsMessage):hover {\n    background-color: var(--blue_0);\n  }\n\n  table tbody td {\n    color: var(--neutral_6);\n    border-bottom: 1px solid var(--neutral_0);\n    box-sizing: border-box;\n    font-size: 13px;\n    padding: 18px 28px;\n    text-align: left;\n    vertical-align: middle;\n  }\n\n  .hasBorder tr:last-of-type td {\n    border-bottom: none;\n  }\n\n  .hasBorder thead tr:first-child th:first-child,\n  .hasBorder.noHeader tbody tr:first-child td:first-child {\n    border-top-left-radius: 4px;\n  }\n\n  .hasBorder thead tr:first-child th:last-child,\n  .hasBorder.noHeader tbody tr:first-child td:last-child {\n    border-top-right-radius: 4px;\n  }\n\n  .hasBorder tbody tr:last-child td:first-child {\n    border-bottom-left-radius: 4px;\n  }\n\n  .hasBorder tbody tr:last-child td:last-child {\n    border-bottom-right-radius: 4px;\n  }\n',
					position: {
						start: {
							line: 139,
							column: 8,
							offset: 3504,
						},
						end: {
							line: 281,
							column: 1,
							offset: 6247,
						},
					},
				},
			],
			position: {
				start: {
					line: 139,
					column: 1,
					offset: 3497,
				},
				end: {
					line: 281,
					column: 9,
					offset: 6255,
				},
			},
		},
		{
			type: 'text',
			value: '\n\n\n',
			position: {
				start: {
					line: 281,
					column: 9,
					offset: 6255,
				},
				end: {
					line: 284,
					column: 1,
					offset: 6258,
				},
			},
		},
		{
			type: 'svelte_element',
			tag: 'div',
			properties: [
				{
					type: 'svelte_property',
					name: 'class',
					value: [
						{
							type: 'text',
							value: 'wrapper',
							position: {
								start: {
									line: 284,
									column: 13,
									offset: 6270,
								},
								end: {
									line: 284,
									column: 21,
									offset: 6278,
								},
							},
						},
					],
					modifiers: [],
					shorthand: 'none',
					position: {
						start: {
							line: 284,
							column: 6,
							offset: 6263,
						},
						end: {
							line: 284,
							column: 21,
							offset: 6278,
						},
					},
				},
			],
			selfclosing: false,
			children: [
				{
					type: 'text',
					value: '\n  ',
					position: {
						start: {
							line: 284,
							column: 22,
							offset: 6279,
						},
						end: {
							line: 285,
							column: 3,
							offset: 6282,
						},
					},
				},
				{
					type: 'svelte_element',
					tag: 'div',
					properties: [
						{
							type: 'svelte_property',
							name: 'class',
							value: [
								{
									type: 'text',
									value: 'table',
									position: {
										start: {
											line: 285,
											column: 15,
											offset: 6294,
										},
										end: {},
									},
								},
								{
									type: 'text',
									value: ' ',
									position: {
										start: {
											line: 285,
											column: 20,
											offset: 6299,
										},
										end: {
											line: 285,
											column: 21,
											offset: 6300,
										},
									},
								},
								{
									type: 'svelte_dynamic_content',
									position: {
										start: {
											line: 285,
											column: 21,
											offset: 6300,
										},
										end: {
											line: 285,
											column: 35,
											offset: 6314,
										},
									},
									expression: {
										type: 'svelte_expression',
										value: ' ClassNames ',
										position: {
											start: {
												line: 285,
												column: 22,
												offset: 6301,
											},
											end: {
												line: 285,
												column: 34,
												offset: 6313,
											},
										},
									},
								},
							],
							modifiers: [],
							shorthand: 'none',
							position: {
								start: {
									line: 285,
									column: 8,
									offset: 6287,
								},
								end: {
									line: 285,
									column: 36,
									offset: 6315,
								},
							},
						},
					],
					selfclosing: false,
					children: [
						{
							type: 'text',
							value: '\n    ',
							position: {
								start: {
									line: 285,
									column: 37,
									offset: 6316,
								},
								end: {
									line: 286,
									column: 5,
									offset: 6321,
								},
							},
						},
						{
							type: 'svelte_element',
							tag: 'table',
							properties: [],
							selfclosing: false,
							children: [
								{
									type: 'text',
									value: '\n\n      ',
									position: {
										start: {
											line: 286,
											column: 12,
											offset: 6328,
										},
										end: {
											line: 288,
											column: 7,
											offset: 6336,
										},
									},
								},
								{
									type: 'svelte_element',
									tag: 'colgroup',
									properties: [],
									selfclosing: false,
									children: [
										{
											type: 'text',
											value: '\n        ',
											position: {
												start: {
													line: 288,
													column: 17,
													offset: 6346,
												},
												end: {
													line: 289,
													column: 9,
													offset: 6355,
												},
											},
										},
										{
											type: 'svelte_branching_block',
											name: 'each',
											branches: [
												{
													type: 'svelte_branch',
													name: 'each',
													expression: {
														type: 'svelte_expression',
														value: 'columns as col ',
														position: {
															start: {
																line: 289,
																column: 17,
																offset: 6363,
															},
															end: {
																line: 289,
																column: 32,
																offset: 6378,
															},
														},
													},
													children: [
														{
															type: 'text',
															value: '\n        ',
															position: {
																start: {
																	line: 289,
																	column: 33,
																	offset: 6379,
																},
																end: {
																	line: 290,
																	column: 9,
																	offset: 6388,
																},
															},
														},
														{
															type: 'svelte_element',
															tag: 'col',
															properties: [
																{
																	type: 'svelte_property',
																	name: 'style',
																	value: [
																		{
																			type: 'svelte_dynamic_content',
																			position: {
																				start: {
																					line: 290,
																					column: 21,
																					offset: 6400,
																				},
																				end: {
																					line: 290,
																					column: 38,
																					offset: 6417,
																				},
																			},
																			expression: {
																				type: 'svelte_expression',
																				value: ' colWidth(col) ',
																				position: {
																					start: {
																						line: 290,
																						column: 22,
																						offset: 6401,
																					},
																					end: {
																						line: 290,
																						column: 37,
																						offset: 6416,
																					},
																				},
																			},
																		},
																	],
																	modifiers: [],
																	shorthand: 'none',
																	position: {
																		start: {
																			line: 290,
																			column: 14,
																			offset: 6393,
																		},
																		end: {
																			line: 290,
																			column: 39,
																			offset: 6418,
																		},
																	},
																},
															],
															selfclosing: true,
															children: [],
															position: {
																start: {
																	line: 290,
																	column: 9,
																	offset: 6388,
																},
																end: {
																	line: 290,
																	column: 42,
																	offset: 6421,
																},
															},
														},
														{
															type: 'text',
															value: '\n        ',
															position: {
																start: {
																	line: 290,
																	column: 42,
																	offset: 6421,
																},
																end: {
																	line: 291,
																	column: 9,
																	offset: 6430,
																},
															},
														},
													],
													position: {
														start: {
															line: 289,
															column: 9,
															offset: 6355,
														},
														end: {
															line: 291,
															column: 9,
															offset: 6430,
														},
													},
												},
											],
											position: {
												start: {
													line: 289,
													column: 9,
													offset: 6355,
												},
												end: {
													line: 291,
													column: 18,
													offset: 6439,
												},
											},
										},
										{
											type: 'text',
											value: '\n      ',
											position: {
												start: {
													line: 291,
													column: 18,
													offset: 6439,
												},
												end: {
													line: 292,
													column: 7,
													offset: 6446,
												},
											},
										},
									],
									position: {
										start: {
											line: 288,
											column: 7,
											offset: 6336,
										},
										end: {
											line: 292,
											column: 18,
											offset: 6457,
										},
									},
								},
								{
									type: 'text',
									value: '\n\n      ',
									position: {
										start: {
											line: 292,
											column: 18,
											offset: 6457,
										},
										end: {
											line: 294,
											column: 7,
											offset: 6465,
										},
									},
								},
								{
									type: 'svelte_branching_block',
									name: 'if',
									branches: [
										{
											type: 'svelte_branch',
											name: 'if',
											expression: {
												type: 'svelte_expression',
												value: 'showHeader ',
												position: {
													start: {
														line: 294,
														column: 13,
														offset: 6471,
													},
													end: {
														line: 294,
														column: 24,
														offset: 6482,
													},
												},
											},
											children: [
												{
													type: 'text',
													value: '\n      ',
													position: {
														start: {
															line: 294,
															column: 25,
															offset: 6483,
														},
														end: {
															line: 295,
															column: 7,
															offset: 6490,
														},
													},
												},
												{
													type: 'svelte_element',
													tag: 'thead',
													properties: [],
													selfclosing: false,
													children: [
														{
															type: 'text',
															value: '\n        ',
															position: {
																start: {
																	line: 295,
																	column: 14,
																	offset: 6497,
																},
																end: {
																	line: 296,
																	column: 9,
																	offset: 6506,
																},
															},
														},
														{
															type: 'svelte_element',
															tag: 'tr',
															properties: [],
															selfclosing: false,
															children: [
																{
																	type: 'text',
																	value: '\n          ',
																	position: {
																		start: {
																			line: 296,
																			column: 13,
																			offset: 6510,
																		},
																		end: {
																			line: 297,
																			column: 11,
																			offset: 6521,
																		},
																	},
																},
																{
																	type: 'svelte_branching_block',
																	name: 'each',
																	branches: [
																		{
																			type: 'svelte_branch',
																			name: 'each',
																			expression: {
																				type: 'svelte_expression',
																				value: 'columns as headerItem ',
																				position: {
																					start: {
																						line: 297,
																						column: 19,
																						offset: 6529,
																					},
																					end: {
																						line: 297,
																						column: 41,
																						offset: 6551,
																					},
																				},
																			},
																			children: [
																				{
																					type: 'text',
																					value: '\n          ',
																					position: {
																						start: {
																							line: 297,
																							column: 42,
																							offset: 6552,
																						},
																						end: {
																							line: 298,
																							column: 11,
																							offset: 6563,
																						},
																					},
																				},
																				{
																					type: 'svelte_element',
																					tag: 'th',
																					properties: [
																						{
																							type: 'svelte_property',
																							name: 'style',
																							value: [
																								{
																									type: 'svelte_dynamic_content',
																									position: {
																										start: {
																											line: 298,
																											column: 22,
																											offset: 6574,
																										},
																										end: {
																											line: 298,
																											column: 47,
																											offset: 6599,
																										},
																									},
																									expression: {
																										type: 'svelte_expression',
																										value: ' cellAlign(headerItem) ',
																										position: {
																											start: {
																												line: 298,
																												column: 23,
																												offset: 6575,
																											},
																											end: {
																												line: 298,
																												column: 46,
																												offset: 6598,
																											},
																										},
																									},
																								},
																							],
																							modifiers: [],
																							shorthand: 'none',
																							position: {
																								start: {
																									line: 298,
																									column: 15,
																									offset: 6567,
																								},
																								end: {
																									line: 298,
																									column: 48,
																									offset: 6600,
																								},
																							},
																						},
																					],
																					selfclosing: false,
																					children: [
																						{
																							type: 'text',
																							value: '\n            ',
																							position: {
																								start: {
																									line: 298,
																									column: 49,
																									offset: 6601,
																								},
																								end: {
																									line: 299,
																									column: 13,
																									offset: 6614,
																								},
																							},
																						},
																						{
																							type: 'svelte_branching_block',
																							name: 'if',
																							branches: [
																								{
																									type: 'svelte_branch',
																									name: 'if',
																									expression: {
																										type: 'svelte_expression',
																										value: 'headerItem.sort ',
																										position: {
																											start: {
																												line: 299,
																												column: 19,
																												offset: 6620,
																											},
																											end: {
																												line: 299,
																												column: 35,
																												offset: 6636,
																											},
																										},
																									},
																									children: [
																										{
																											type: 'text',
																											value: '\n            ',
																											position: {
																												start: {
																													line: 299,
																													column: 36,
																													offset: 6637,
																												},
																												end: {
																													line: 300,
																													column: 13,
																													offset: 6650,
																												},
																											},
																										},
																										{
																											type: 'svelte_element',
																											tag: 'span',
																											properties: [
																												{
																													type: 'svelte_directive',
																													name: 'on',
																													value: [
																														{
																															type: 'svelte_dynamic_content',
																															position: {
																																start: {
																																	line: 300,
																																	column: 29,
																																	offset: 6666,
																																},
																																end: {
																																	line: 300,
																																	column: 53,
																																	offset: 6690,
																																},
																															},
																															expression: {
																																type: 'svelte_expression',
																																value: '() => sort(headerItem)',
																																position: {
																																	start: {
																																		line: 300,
																																		column: 30,
																																		offset: 6667,
																																	},
																																	end: {
																																		line: 300,
																																		column: 52,
																																		offset: 6689,
																																	},
																																},
																															},
																														},
																													],
																													modifiers: [],
																													shorthand: 'none',
																													position: {
																														start: {
																															line: 300,
																															column: 19,
																															offset: 6656,
																														},
																														end: {
																															line: 300,
																															column: 54,
																															offset: 6691,
																														},
																													},
																													specifier: 'click',
																												},
																												{
																													type: 'svelte_property',
																													name: 'class',
																													value: [
																														{
																															type: 'text',
																															value: 'sort',
																															position: {
																																start: {
																																	line: 301,
																																	column: 22,
																																	offset: 6713,
																																},
																																end: {},
																															},
																														},
																														{
																															type: 'text',
																															value: ' ',
																															position: {
																																start: {
																																	line: 301,
																																	column: 26,
																																	offset: 6717,
																																},
																																end: {
																																	line: 301,
																																	column: 27,
																																	offset: 6718,
																																},
																															},
																														},
																														{
																															type: 'svelte_dynamic_content',
																															position: {
																																start: {
																																	line: 301,
																																	column: 27,
																																	offset: 6718,
																																},
																																end: {
																																	line: 301,
																																	column: 112,
																																	offset: 6803,
																																},
																															},
																															expression: {
																																type: 'svelte_expression',
																																value:
																																	' sortClassNames(headerItem.sort, headerItem.cell, activeSort, activeSortDirection) ',
																																position: {
																																	start: {
																																		line: 301,
																																		column: 28,
																																		offset: 6719,
																																	},
																																	end: {
																																		line: 301,
																																		column: 111,
																																		offset: 6802,
																																	},
																																},
																															},
																														},
																													],
																													modifiers: [],
																													shorthand: 'none',
																													position: {
																														start: {
																															line: 301,
																															column: 15,
																															offset: 6706,
																														},
																														end: {
																															line: 301,
																															column: 113,
																															offset: 6804,
																														},
																													},
																												},
																											],
																											selfclosing: false,
																											children: [
																												{
																													type: 'text',
																													value: '\n              ',
																													position: {
																														start: {
																															line: 301,
																															column: 114,
																															offset: 6805,
																														},
																														end: {
																															line: 302,
																															column: 15,
																															offset: 6820,
																														},
																													},
																												},
																												{
																													type: 'svelte_branching_block',
																													name: 'if',
																													branches: [
																														{
																															type: 'svelte_branch',
																															name: 'if',
																															expression: {
																																type: 'svelte_expression',
																																value:
																																	'headerItem.title.component ',
																																position: {
																																	start: {
																																		line: 302,
																																		column: 21,
																																		offset: 6826,
																																	},
																																	end: {
																																		line: 302,
																																		column: 48,
																																		offset: 6853,
																																	},
																																},
																															},
																															children: [
																																{
																																	type: 'text',
																																	value: '\n              ',
																																	position: {
																																		start: {
																																			line: 302,
																																			column: 49,
																																			offset: 6854,
																																		},
																																		end: {
																																			line: 303,
																																			column: 15,
																																			offset: 6869,
																																		},
																																	},
																																},
																																{
																																	type: 'svelte_meta',
																																	tag: 'component',
																																	properties: [
																																		{
																																			type: 'svelte_property',
																																			name: 'this',
																																			value: [
																																				{
																																					type: 'svelte_dynamic_content',
																																					position: {
																																						start: {
																																							line: 303,
																																							column: 38,
																																							offset: 6892,
																																						},
																																						end: {
																																							line: 303,
																																							column: 66,
																																							offset: 6920,
																																						},
																																					},
																																					expression: {
																																						type: 'svelte_expression',
																																						value:
																																							'headerItem.title.component',
																																						position: {
																																							start: {
																																								line: 303,
																																								column: 39,
																																								offset: 6893,
																																							},
																																							end: {
																																								line: 303,
																																								column: 65,
																																								offset: 6919,
																																							},
																																						},
																																					},
																																				},
																																			],
																																			modifiers: [],
																																			shorthand: 'none',
																																			position: {
																																				start: {
																																					line: 303,
																																					column: 33,
																																					offset: 6887,
																																				},
																																				end: {
																																					line: 303,
																																					column: 66,
																																					offset: 6920,
																																				},
																																			},
																																		},
																																		{
																																			type: 'svelte_property',
																																			name: '...headerItem.title.props',
																																			value: [
																																				{
																																					type: 'svelte_dynamic_content',
																																					expression: {
																																						type: 'svelte_expression',
																																						value:
																																							'...headerItem.title.props',
																																						position: {
																																							start: {
																																								line: 303,
																																								column: 68,
																																								offset: 6922,
																																							},
																																							end: {
																																								line: 303,
																																								column: 93,
																																								offset: 6947,
																																							},
																																						},
																																					},
																																					position: {
																																						start: {
																																							line: 303,
																																							column: 67,
																																							offset: 6921,
																																						},
																																						end: {
																																							line: 303,
																																							column: 93,
																																							offset: 6947,
																																						},
																																					},
																																				},
																																			],
																																			modifiers: [],
																																			shorthand: 'expression',
																																			position: {
																																				start: {
																																					line: 303,
																																					column: 67,
																																					offset: 6921,
																																				},
																																				end: {
																																					line: 303,
																																					column: 93,
																																					offset: 6947,
																																				},
																																			},
																																		},
																																	],
																																	selfclosing: true,
																																	children: [],
																																	position: {
																																		start: {
																																			line: 303,
																																			column: 15,
																																			offset: 6869,
																																		},
																																		end: {
																																			line: 303,
																																			column: 97,
																																			offset: 6951,
																																		},
																																	},
																																},
																																{
																																	type: 'text',
																																	value: '\n              ',
																																	position: {
																																		start: {
																																			line: 303,
																																			column: 97,
																																			offset: 6951,
																																		},
																																		end: {
																																			line: 304,
																																			column: 15,
																																			offset: 6966,
																																		},
																																	},
																																},
																															],
																															position: {
																																start: {
																																	line: 302,
																																	column: 15,
																																	offset: 6820,
																																},
																																end: {
																																	line: 304,
																																	column: 15,
																																	offset: 6966,
																																},
																															},
																														},
																														{
																															type: 'svelte_branch',
																															name: 'else',
																															expression: {
																																type: 'svelte_expression',
																																value: '',
																																position: {
																																	start: {
																																		line: 304,
																																		column: 23,
																																		offset: 6974,
																																	},
																																	end: {
																																		line: 304,
																																		column: 23,
																																		offset: 6974,
																																	},
																																},
																															},
																															children: [
																																{
																																	type: 'text',
																																	value: '\n              ',
																																	position: {
																																		start: {
																																			line: 304,
																																			column: 24,
																																			offset: 6975,
																																		},
																																		end: {
																																			line: 305,
																																			column: 15,
																																			offset: 6990,
																																		},
																																	},
																																},
																																{
																																	type: 'svelte_void_block',
																																	name: 'html',
																																	expression: {
																																		type: 'svelte_expression',
																																		value: 'headerItem.title ',
																																		position: {
																																			start: {
																																				line: 305,
																																				column: 23,
																																				offset: 6998,
																																			},
																																			end: {
																																				line: 305,
																																				column: 40,
																																				offset: 7015,
																																			},
																																		},
																																	},
																																	position: {
																																		start: {
																																			line: 305,
																																			column: 15,
																																			offset: 6990,
																																		},
																																		end: {
																																			line: 305,
																																			column: 41,
																																			offset: 7016,
																																		},
																																	},
																																},
																																{
																																	type: 'text',
																																	value: '\n              ',
																																	position: {
																																		start: {
																																			line: 305,
																																			column: 41,
																																			offset: 7016,
																																		},
																																		end: {
																																			line: 306,
																																			column: 15,
																																			offset: 7031,
																																		},
																																	},
																																},
																															],
																															position: {
																																start: {
																																	line: 304,
																																	column: 15,
																																	offset: 6966,
																																},
																																end: {
																																	line: 306,
																																	column: 15,
																																	offset: 7031,
																																},
																															},
																														},
																													],
																													position: {
																														start: {
																															line: 302,
																															column: 15,
																															offset: 6820,
																														},
																														end: {
																															line: 306,
																															column: 22,
																															offset: 7038,
																														},
																													},
																												},
																												{
																													type: 'text',
																													value: '\n            ',
																													position: {
																														start: {
																															line: 306,
																															column: 22,
																															offset: 7038,
																														},
																														end: {
																															line: 307,
																															column: 13,
																															offset: 7051,
																														},
																													},
																												},
																											],
																											position: {
																												start: {
																													line: 300,
																													column: 13,
																													offset: 6650,
																												},
																												end: {
																													line: 307,
																													column: 20,
																													offset: 7058,
																												},
																											},
																										},
																										{
																											type: 'text',
																											value: '\n            ',
																											position: {
																												start: {
																													line: 307,
																													column: 20,
																													offset: 7058,
																												},
																												end: {
																													line: 308,
																													column: 13,
																													offset: 7071,
																												},
																											},
																										},
																									],
																									position: {
																										start: {
																											line: 299,
																											column: 13,
																											offset: 6614,
																										},
																										end: {
																											line: 308,
																											column: 13,
																											offset: 7071,
																										},
																									},
																								},
																								{
																									type: 'svelte_branch',
																									name: 'else',
																									expression: {
																										type: 'svelte_expression',
																										value: '',
																										position: {
																											start: {
																												line: 308,
																												column: 21,
																												offset: 7079,
																											},
																											end: {
																												line: 308,
																												column: 21,
																												offset: 7079,
																											},
																										},
																									},
																									children: [
																										{
																											type: 'text',
																											value: '\n            ',
																											position: {
																												start: {
																													line: 308,
																													column: 22,
																													offset: 7080,
																												},
																												end: {
																													line: 309,
																													column: 13,
																													offset: 7093,
																												},
																											},
																										},
																										{
																											type: 'svelte_branching_block',
																											name: 'if',
																											branches: [
																												{
																													type: 'svelte_branch',
																													name: 'if',
																													expression: {
																														type: 'svelte_expression',
																														value: 'headerItem.title.component ',
																														position: {
																															start: {
																																line: 309,
																																column: 19,
																																offset: 7099,
																															},
																															end: {
																																line: 309,
																																column: 46,
																																offset: 7126,
																															},
																														},
																													},
																													children: [
																														{
																															type: 'text',
																															value: '\n            ',
																															position: {
																																start: {
																																	line: 309,
																																	column: 47,
																																	offset: 7127,
																																},
																																end: {
																																	line: 310,
																																	column: 13,
																																	offset: 7140,
																																},
																															},
																														},
																														{
																															type: 'svelte_meta',
																															tag: 'component',
																															properties: [
																																{
																																	type: 'svelte_property',
																																	name: 'this',
																																	value: [
																																		{
																																			type: 'svelte_dynamic_content',
																																			position: {
																																				start: {
																																					line: 310,
																																					column: 36,
																																					offset: 7163,
																																				},
																																				end: {
																																					line: 310,
																																					column: 64,
																																					offset: 7191,
																																				},
																																			},
																																			expression: {
																																				type: 'svelte_expression',
																																				value:
																																					'headerItem.title.component',
																																				position: {
																																					start: {
																																						line: 310,
																																						column: 37,
																																						offset: 7164,
																																					},
																																					end: {
																																						line: 310,
																																						column: 63,
																																						offset: 7190,
																																					},
																																				},
																																			},
																																		},
																																	],
																																	modifiers: [],
																																	shorthand: 'none',
																																	position: {
																																		start: {
																																			line: 310,
																																			column: 31,
																																			offset: 7158,
																																		},
																																		end: {
																																			line: 310,
																																			column: 64,
																																			offset: 7191,
																																		},
																																	},
																																},
																																{
																																	type: 'svelte_property',
																																	name: '...headerItem.title.data',
																																	value: [
																																		{
																																			type: 'svelte_dynamic_content',
																																			expression: {
																																				type: 'svelte_expression',
																																				value:
																																					'...headerItem.title.data',
																																				position: {
																																					start: {
																																						line: 310,
																																						column: 66,
																																						offset: 7193,
																																					},
																																					end: {
																																						line: 310,
																																						column: 90,
																																						offset: 7217,
																																					},
																																				},
																																			},
																																			position: {
																																				start: {
																																					line: 310,
																																					column: 65,
																																					offset: 7192,
																																				},
																																				end: {
																																					line: 310,
																																					column: 90,
																																					offset: 7217,
																																				},
																																			},
																																		},
																																	],
																																	modifiers: [],
																																	shorthand: 'expression',
																																	position: {
																																		start: {
																																			line: 310,
																																			column: 65,
																																			offset: 7192,
																																		},
																																		end: {
																																			line: 310,
																																			column: 90,
																																			offset: 7217,
																																		},
																																	},
																																},
																															],
																															selfclosing: true,
																															children: [],
																															position: {
																																start: {
																																	line: 310,
																																	column: 13,
																																	offset: 7140,
																																},
																																end: {
																																	line: 310,
																																	column: 94,
																																	offset: 7221,
																																},
																															},
																														},
																														{
																															type: 'text',
																															value: '\n            ',
																															position: {
																																start: {
																																	line: 310,
																																	column: 94,
																																	offset: 7221,
																																},
																																end: {
																																	line: 311,
																																	column: 13,
																																	offset: 7234,
																																},
																															},
																														},
																													],
																													position: {
																														start: {
																															line: 309,
																															column: 13,
																															offset: 7093,
																														},
																														end: {
																															line: 311,
																															column: 13,
																															offset: 7234,
																														},
																													},
																												},
																												{
																													type: 'svelte_branch',
																													name: 'else',
																													expression: {
																														type: 'svelte_expression',
																														value: '',
																														position: {
																															start: {
																																line: 311,
																																column: 21,
																																offset: 7242,
																															},
																															end: {
																																line: 311,
																																column: 21,
																																offset: 7242,
																															},
																														},
																													},
																													children: [
																														{
																															type: 'text',
																															value: '\n            ',
																															position: {
																																start: {
																																	line: 311,
																																	column: 22,
																																	offset: 7243,
																																},
																																end: {
																																	line: 312,
																																	column: 13,
																																	offset: 7256,
																																},
																															},
																														},
																														{
																															type: 'svelte_void_block',
																															name: 'html',
																															expression: {
																																type: 'svelte_expression',
																																value: 'headerItem.title ',
																																position: {
																																	start: {
																																		line: 312,
																																		column: 21,
																																		offset: 7264,
																																	},
																																	end: {
																																		line: 312,
																																		column: 38,
																																		offset: 7281,
																																	},
																																},
																															},
																															position: {
																																start: {
																																	line: 312,
																																	column: 13,
																																	offset: 7256,
																																},
																																end: {
																																	line: 312,
																																	column: 39,
																																	offset: 7282,
																																},
																															},
																														},
																														{
																															type: 'text',
																															value: '\n            ',
																															position: {
																																start: {
																																	line: 312,
																																	column: 39,
																																	offset: 7282,
																																},
																																end: {
																																	line: 313,
																																	column: 13,
																																	offset: 7295,
																																},
																															},
																														},
																													],
																													position: {
																														start: {
																															line: 311,
																															column: 13,
																															offset: 7234,
																														},
																														end: {
																															line: 313,
																															column: 13,
																															offset: 7295,
																														},
																													},
																												},
																											],
																											position: {
																												start: {
																													line: 309,
																													column: 13,
																													offset: 7093,
																												},
																												end: {
																													line: 313,
																													column: 20,
																													offset: 7302,
																												},
																											},
																										},
																										{
																											type: 'text',
																											value: '\n            ',
																											position: {
																												start: {
																													line: 313,
																													column: 20,
																													offset: 7302,
																												},
																												end: {
																													line: 314,
																													column: 13,
																													offset: 7315,
																												},
																											},
																										},
																									],
																									position: {
																										start: {
																											line: 308,
																											column: 13,
																											offset: 7071,
																										},
																										end: {
																											line: 314,
																											column: 13,
																											offset: 7315,
																										},
																									},
																								},
																							],
																							position: {
																								start: {
																									line: 299,
																									column: 13,
																									offset: 6614,
																								},
																								end: {
																									line: 314,
																									column: 20,
																									offset: 7322,
																								},
																							},
																						},
																						{
																							type: 'text',
																							value: '\n          ',
																							position: {
																								start: {
																									line: 314,
																									column: 20,
																									offset: 7322,
																								},
																								end: {
																									line: 315,
																									column: 11,
																									offset: 7333,
																								},
																							},
																						},
																					],
																					position: {
																						start: {
																							line: 298,
																							column: 11,
																							offset: 6563,
																						},
																						end: {
																							line: 315,
																							column: 16,
																							offset: 7338,
																						},
																					},
																				},
																				{
																					type: 'text',
																					value: '\n          ',
																					position: {
																						start: {
																							line: 315,
																							column: 16,
																							offset: 7338,
																						},
																						end: {
																							line: 316,
																							column: 11,
																							offset: 7349,
																						},
																					},
																				},
																			],
																			position: {
																				start: {
																					line: 297,
																					column: 11,
																					offset: 6521,
																				},
																				end: {
																					line: 316,
																					column: 11,
																					offset: 7349,
																				},
																			},
																		},
																	],
																	position: {
																		start: {
																			line: 297,
																			column: 11,
																			offset: 6521,
																		},
																		end: {
																			line: 316,
																			column: 20,
																			offset: 7358,
																		},
																	},
																},
																{
																	type: 'text',
																	value: '\n        ',
																	position: {
																		start: {
																			line: 316,
																			column: 20,
																			offset: 7358,
																		},
																		end: {
																			line: 317,
																			column: 9,
																			offset: 7367,
																		},
																	},
																},
															],
															position: {
																start: {
																	line: 296,
																	column: 9,
																	offset: 6506,
																},
																end: {
																	line: 317,
																	column: 14,
																	offset: 7372,
																},
															},
														},
														{
															type: 'text',
															value: '\n      ',
															position: {
																start: {
																	line: 317,
																	column: 14,
																	offset: 7372,
																},
																end: {
																	line: 318,
																	column: 7,
																	offset: 7379,
																},
															},
														},
													],
													position: {
														start: {
															line: 295,
															column: 7,
															offset: 6490,
														},
														end: {
															line: 318,
															column: 15,
															offset: 7387,
														},
													},
												},
												{
													type: 'text',
													value: '\n      ',
													position: {
														start: {
															line: 318,
															column: 15,
															offset: 7387,
														},
														end: {
															line: 319,
															column: 7,
															offset: 7394,
														},
													},
												},
											],
											position: {
												start: {
													line: 294,
													column: 7,
													offset: 6465,
												},
												end: {
													line: 319,
													column: 7,
													offset: 7394,
												},
											},
										},
									],
									position: {
										start: {
											line: 294,
											column: 7,
											offset: 6465,
										},
										end: {
											line: 319,
											column: 14,
											offset: 7401,
										},
									},
								},
								{
									type: 'text',
									value: '\n      ',
									position: {
										start: {
											line: 319,
											column: 14,
											offset: 7401,
										},
										end: {
											line: 320,
											column: 7,
											offset: 7408,
										},
									},
								},
								{
									type: 'svelte_element',
									tag: 'tbody',
									properties: [],
									selfclosing: false,
									children: [
										{
											type: 'text',
											value: '\n        ',
											position: {
												start: {
													line: 320,
													column: 14,
													offset: 7415,
												},
												end: {
													line: 321,
													column: 9,
													offset: 7424,
												},
											},
										},
										{
											type: 'svelte_branching_block',
											name: 'if',
											branches: [
												{
													type: 'svelte_branch',
													name: 'if',
													expression: {
														type: 'svelte_expression',
														value: 'Data.length <= 0 && !isLoading ',
														position: {
															start: {
																line: 321,
																column: 15,
																offset: 7430,
															},
															end: {
																line: 321,
																column: 46,
																offset: 7461,
															},
														},
													},
													children: [
														{
															type: 'text',
															value: ' \n          ',
															position: {
																start: {
																	line: 321,
																	column: 47,
																	offset: 7462,
																},
																end: {
																	line: 322,
																	column: 11,
																	offset: 7474,
																},
															},
														},
														{
															type: 'svelte_element',
															tag: 'tr',
															properties: [
																{
																	type: 'svelte_property',
																	name: 'class',
																	value: [
																		{
																			type: 'text',
																			value: 'noResultsMessage',
																			position: {
																				start: {
																					line: 322,
																					column: 22,
																					offset: 7485,
																				},
																				end: {
																					line: 322,
																					column: 39,
																					offset: 7502,
																				},
																			},
																		},
																	],
																	modifiers: [],
																	shorthand: 'none',
																	position: {
																		start: {
																			line: 322,
																			column: 15,
																			offset: 7478,
																		},
																		end: {
																			line: 322,
																			column: 39,
																			offset: 7502,
																		},
																	},
																},
															],
															selfclosing: false,
															children: [
																{
																	type: 'text',
																	value: '\n            ',
																	position: {
																		start: {
																			line: 322,
																			column: 40,
																			offset: 7503,
																		},
																		end: {
																			line: 323,
																			column: 13,
																			offset: 7516,
																		},
																	},
																},
																{
																	type: 'svelte_element',
																	tag: 'td',
																	properties: [
																		{
																			type: 'svelte_property',
																			name: 'colspan',
																			value: [
																				{
																					type: 'svelte_dynamic_content',
																					position: {
																						start: {
																							line: 323,
																							column: 26,
																							offset: 7529,
																						},
																						end: {
																							line: 323,
																							column: 44,
																							offset: 7547,
																						},
																					},
																					expression: {
																						type: 'svelte_expression',
																						value: ' columns.length ',
																						position: {
																							start: {
																								line: 323,
																								column: 27,
																								offset: 7530,
																							},
																							end: {
																								line: 323,
																								column: 43,
																								offset: 7546,
																							},
																						},
																					},
																				},
																			],
																			modifiers: [],
																			shorthand: 'none',
																			position: {
																				start: {
																					line: 323,
																					column: 17,
																					offset: 7520,
																				},
																				end: {
																					line: 323,
																					column: 45,
																					offset: 7548,
																				},
																			},
																		},
																	],
																	selfclosing: false,
																	children: [
																		{
																			type: 'text',
																			value: '\n              ',
																			position: {
																				start: {
																					line: 323,
																					column: 46,
																					offset: 7549,
																				},
																				end: {
																					line: 324,
																					column: 15,
																					offset: 7564,
																				},
																			},
																		},
																		{
																			type: 'svelte_element',
																			tag: 'slot',
																			properties: [
																				{
																					type: 'svelte_property',
																					name: 'name',
																					value: [
																						{
																							type: 'text',
																							value: 'noResults',
																							position: {
																								start: {
																									line: 324,
																									column: 27,
																									offset: 7576,
																								},
																								end: {
																									line: 324,
																									column: 37,
																									offset: 7586,
																								},
																							},
																						},
																					],
																					modifiers: [],
																					shorthand: 'none',
																					position: {
																						start: {
																							line: 324,
																							column: 21,
																							offset: 7570,
																						},
																						end: {
																							line: 324,
																							column: 37,
																							offset: 7586,
																						},
																					},
																				},
																			],
																			selfclosing: false,
																			children: [
																				{
																					type: 'svelte_dynamic_content',
																					position: {
																						start: {
																							line: 324,
																							column: 38,
																							offset: 7587,
																						},
																						end: {
																							line: 324,
																							column: 58,
																							offset: 7607,
																						},
																					},
																					expression: {
																						type: 'svelte_expression',
																						value: 'noResultsMessage ',
																						position: {
																							start: {
																								line: 324,
																								column: 40,
																								offset: 7589,
																							},
																							end: {
																								line: 324,
																								column: 57,
																								offset: 7606,
																							},
																						},
																					},
																				},
																			],
																			position: {
																				start: {
																					line: 324,
																					column: 15,
																					offset: 7564,
																				},
																				end: {
																					line: 324,
																					column: 65,
																					offset: 7614,
																				},
																			},
																		},
																		{
																			type: 'text',
																			value: '\n            ',
																			position: {
																				start: {
																					line: 324,
																					column: 65,
																					offset: 7614,
																				},
																				end: {
																					line: 325,
																					column: 13,
																					offset: 7627,
																				},
																			},
																		},
																	],
																	position: {
																		start: {
																			line: 323,
																			column: 13,
																			offset: 7516,
																		},
																		end: {
																			line: 325,
																			column: 18,
																			offset: 7632,
																		},
																	},
																},
																{
																	type: 'text',
																	value: '\n          ',
																	position: {
																		start: {
																			line: 325,
																			column: 18,
																			offset: 7632,
																		},
																		end: {
																			line: 326,
																			column: 11,
																			offset: 7643,
																		},
																	},
																},
															],
															position: {
																start: {
																	line: 322,
																	column: 11,
																	offset: 7474,
																},
																end: {
																	line: 326,
																	column: 16,
																	offset: 7648,
																},
															},
														},
														{
															type: 'text',
															value: '\n          ',
															position: {
																start: {
																	line: 326,
																	column: 16,
																	offset: 7648,
																},
																end: {
																	line: 327,
																	column: 11,
																	offset: 7659,
																},
															},
														},
													],
													position: {
														start: {
															line: 321,
															column: 9,
															offset: 7424,
														},
														end: {
															line: 327,
															column: 11,
															offset: 7659,
														},
													},
												},
											],
											position: {
												start: {
													line: 321,
													column: 9,
													offset: 7424,
												},
												end: {
													line: 327,
													column: 18,
													offset: 7666,
												},
											},
										},
										{
											type: 'text',
											value: '\n\n          ',
											position: {
												start: {
													line: 327,
													column: 18,
													offset: 7666,
												},
												end: {
													line: 329,
													column: 11,
													offset: 7678,
												},
											},
										},
										{
											type: 'svelte_branching_block',
											name: 'each',
											branches: [
												{
													type: 'svelte_branch',
													name: 'each',
													expression: {
														type: 'svelte_expression',
														value: 'Data as row ',
														position: {
															start: {
																line: 329,
																column: 19,
																offset: 7686,
															},
															end: {
																line: 329,
																column: 31,
																offset: 7698,
															},
														},
													},
													children: [
														{
															type: 'text',
															value: '\n          ',
															position: {
																start: {
																	line: 329,
																	column: 32,
																	offset: 7699,
																},
																end: {
																	line: 330,
																	column: 11,
																	offset: 7710,
																},
															},
														},
														{
															type: 'svelte_element',
															tag: 'tr',
															properties: [
																{
																	type: 'svelte_property',
																	name: 'class',
																	value: [
																		{
																			type: 'svelte_dynamic_content',
																			position: {
																				start: {
																					line: 330,
																					column: 22,
																					offset: 7721,
																				},
																				end: {
																					line: 330,
																					column: 61,
																					offset: 7760,
																				},
																			},
																			expression: {
																				type: 'svelte_expression',
																				value: " rowCssClass ? rowCssClass(row) : '' ",
																				position: {
																					start: {
																						line: 330,
																						column: 23,
																						offset: 7722,
																					},
																					end: {
																						line: 330,
																						column: 60,
																						offset: 7759,
																					},
																				},
																			},
																		},
																	],
																	modifiers: [],
																	shorthand: 'none',
																	position: {
																		start: {
																			line: 330,
																			column: 15,
																			offset: 7714,
																		},
																		end: {
																			line: 330,
																			column: 62,
																			offset: 7761,
																		},
																	},
																},
																{
																	type: 'svelte_directive',
																	name: 'on',
																	value: [
																		{
																			type: 'svelte_dynamic_content',
																			position: {
																				start: {
																					line: 330,
																					column: 73,
																					offset: 7772,
																				},
																				end: {
																					line: 330,
																					column: 96,
																					offset: 7795,
																				},
																			},
																			expression: {
																				type: 'svelte_expression',
																				value: '() => onRowClick(row)',
																				position: {
																					start: {
																						line: 330,
																						column: 74,
																						offset: 7773,
																					},
																					end: {
																						line: 330,
																						column: 95,
																						offset: 7794,
																					},
																				},
																			},
																		},
																	],
																	modifiers: [],
																	shorthand: 'none',
																	position: {
																		start: {
																			line: 330,
																			column: 63,
																			offset: 7762,
																		},
																		end: {
																			line: 330,
																			column: 97,
																			offset: 7796,
																		},
																	},
																	specifier: 'click',
																},
															],
															selfclosing: false,
															children: [
																{
																	type: 'text',
																	value: '\n            ',
																	position: {
																		start: {
																			line: 330,
																			column: 98,
																			offset: 7797,
																		},
																		end: {
																			line: 331,
																			column: 13,
																			offset: 7810,
																		},
																	},
																},
																{
																	type: 'svelte_branching_block',
																	name: 'each',
																	branches: [
																		{
																			type: 'svelte_branch',
																			name: 'each',
																			expression: {
																				type: 'svelte_expression',
																				value: 'columns as item ',
																				position: {
																					start: {
																						line: 331,
																						column: 21,
																						offset: 7818,
																					},
																					end: {
																						line: 331,
																						column: 37,
																						offset: 7834,
																					},
																				},
																			},
																			children: [
																				{
																					type: 'text',
																					value: '\n            ',
																					position: {
																						start: {
																							line: 331,
																							column: 38,
																							offset: 7835,
																						},
																						end: {
																							line: 332,
																							column: 13,
																							offset: 7848,
																						},
																					},
																				},
																				{
																					type: 'svelte_element',
																					tag: 'td',
																					properties: [
																						{
																							type: 'svelte_property',
																							name: 'style',
																							value: [
																								{
																									type: 'svelte_dynamic_content',
																									position: {
																										start: {
																											line: 332,
																											column: 24,
																											offset: 7859,
																										},
																										end: {
																											line: 332,
																											column: 43,
																											offset: 7878,
																										},
																									},
																									expression: {
																										type: 'svelte_expression',
																										value: ' cellAlign(item) ',
																										position: {
																											start: {
																												line: 332,
																												column: 25,
																												offset: 7860,
																											},
																											end: {
																												line: 332,
																												column: 42,
																												offset: 7877,
																											},
																										},
																									},
																								},
																							],
																							modifiers: [],
																							shorthand: 'none',
																							position: {
																								start: {
																									line: 332,
																									column: 17,
																									offset: 7852,
																								},
																								end: {
																									line: 332,
																									column: 44,
																									offset: 7879,
																								},
																							},
																						},
																					],
																					selfclosing: false,
																					children: [
																						{
																							type: 'text',
																							value: '\n              ',
																							position: {
																								start: {
																									line: 332,
																									column: 45,
																									offset: 7880,
																								},
																								end: {
																									line: 333,
																									column: 15,
																									offset: 7895,
																								},
																							},
																						},
																						{
																							type: 'svelte_branching_block',
																							name: 'if',
																							branches: [
																								{
																									type: 'svelte_branch',
																									name: 'if',
																									expression: {
																										type: 'svelte_expression',
																										value: "typeof item.cell === 'function' ",
																										position: {
																											start: {
																												line: 333,
																												column: 21,
																												offset: 7901,
																											},
																											end: {
																												line: 333,
																												column: 53,
																												offset: 7933,
																											},
																										},
																									},
																									children: [
																										{
																											type: 'text',
																											value: '\n              ',
																											position: {
																												start: {
																													line: 333,
																													column: 54,
																													offset: 7934,
																												},
																												end: {
																													line: 334,
																													column: 15,
																													offset: 7949,
																												},
																											},
																										},
																										{
																											type: 'svelte_void_block',
																											name: 'html',
																											expression: {
																												type: 'svelte_expression',
																												value: 'item.cell(row) ',
																												position: {
																													start: {
																														line: 334,
																														column: 23,
																														offset: 7957,
																													},
																													end: {
																														line: 334,
																														column: 38,
																														offset: 7972,
																													},
																												},
																											},
																											position: {
																												start: {
																													line: 334,
																													column: 15,
																													offset: 7949,
																												},
																												end: {
																													line: 334,
																													column: 39,
																													offset: 7973,
																												},
																											},
																										},
																										{
																											type: 'text',
																											value: '\n              ',
																											position: {
																												start: {
																													line: 334,
																													column: 39,
																													offset: 7973,
																												},
																												end: {
																													line: 335,
																													column: 15,
																													offset: 7988,
																												},
																											},
																										},
																									],
																									position: {
																										start: {
																											line: 333,
																											column: 15,
																											offset: 7895,
																										},
																										end: {
																											line: 335,
																											column: 15,
																											offset: 7988,
																										},
																									},
																								},
																								{
																									type: 'svelte_branch',
																									name: 'else if',
																									expression: {
																										type: 'svelte_expression',
																										value: 'item.cell.component ',
																										position: {
																											start: {
																												line: 335,
																												column: 26,
																												offset: 7999,
																											},
																											end: {
																												line: 335,
																												column: 46,
																												offset: 8019,
																											},
																										},
																									},
																									children: [
																										{
																											type: 'text',
																											value: '\n              ',
																											position: {
																												start: {
																													line: 335,
																													column: 47,
																													offset: 8020,
																												},
																												end: {
																													line: 336,
																													column: 15,
																													offset: 8035,
																												},
																											},
																										},
																										{
																											type: 'svelte_meta',
																											tag: 'component',
																											properties: [
																												{
																													type: 'svelte_property',
																													name: 'this',
																													value: [
																														{
																															type: 'svelte_dynamic_content',
																															position: {
																																start: {
																																	line: 336,
																																	column: 38,
																																	offset: 8058,
																																},
																																end: {
																																	line: 336,
																																	column: 59,
																																	offset: 8079,
																																},
																															},
																															expression: {
																																type: 'svelte_expression',
																																value: 'item.cell.component',
																																position: {
																																	start: {
																																		line: 336,
																																		column: 39,
																																		offset: 8059,
																																	},
																																	end: {
																																		line: 336,
																																		column: 58,
																																		offset: 8078,
																																	},
																																},
																															},
																														},
																													],
																													modifiers: [],
																													shorthand: 'none',
																													position: {
																														start: {
																															line: 336,
																															column: 33,
																															offset: 8053,
																														},
																														end: {
																															line: 336,
																															column: 59,
																															offset: 8079,
																														},
																													},
																												},
																												{
																													type: 'svelte_property',
																													name: '...item.cell.props',
																													value: [
																														{
																															type: 'svelte_dynamic_content',
																															expression: {
																																type: 'svelte_expression',
																																value: '...item.cell.props',
																																position: {
																																	start: {
																																		line: 336,
																																		column: 61,
																																		offset: 8081,
																																	},
																																	end: {
																																		line: 336,
																																		column: 79,
																																		offset: 8099,
																																	},
																																},
																															},
																															position: {
																																start: {
																																	line: 336,
																																	column: 60,
																																	offset: 8080,
																																},
																																end: {
																																	line: 336,
																																	column: 79,
																																	offset: 8099,
																																},
																															},
																														},
																													],
																													modifiers: [],
																													shorthand: 'expression',
																													position: {
																														start: {
																															line: 336,
																															column: 60,
																															offset: 8080,
																														},
																														end: {
																															line: 336,
																															column: 79,
																															offset: 8099,
																														},
																													},
																												},
																												{
																													type: 'svelte_property',
																													name: 'item',
																													value: [
																														{
																															type: 'svelte_dynamic_content',
																															position: {
																																start: {
																																	line: 336,
																																	column: 87,
																																	offset: 8107,
																																},
																																end: {
																																	line: 336,
																																	column: 92,
																																	offset: 8112,
																																},
																															},
																															expression: {
																																type: 'svelte_expression',
																																value: 'row',
																																position: {
																																	start: {
																																		line: 336,
																																		column: 88,
																																		offset: 8108,
																																	},
																																	end: {
																																		line: 336,
																																		column: 91,
																																		offset: 8111,
																																	},
																																},
																															},
																														},
																													],
																													modifiers: [],
																													shorthand: 'none',
																													position: {
																														start: {
																															line: 336,
																															column: 81,
																															offset: 8101,
																														},
																														end: {
																															line: 336,
																															column: 93,
																															offset: 8113,
																														},
																													},
																												},
																											],
																											selfclosing: true,
																											children: [],
																											position: {
																												start: {
																													line: 336,
																													column: 15,
																													offset: 8035,
																												},
																												end: {
																													line: 336,
																													column: 96,
																													offset: 8116,
																												},
																											},
																										},
																										{
																											type: 'text',
																											value: '\n              ',
																											position: {
																												start: {
																													line: 336,
																													column: 96,
																													offset: 8116,
																												},
																												end: {
																													line: 337,
																													column: 15,
																													offset: 8131,
																												},
																											},
																										},
																									],
																									position: {
																										start: {
																											line: 335,
																											column: 15,
																											offset: 7988,
																										},
																										end: {
																											line: 337,
																											column: 15,
																											offset: 8131,
																										},
																									},
																								},
																								{
																									type: 'svelte_branch',
																									name: 'else',
																									expression: {
																										type: 'svelte_expression',
																										value: '',
																										position: {
																											start: {
																												line: 337,
																												column: 23,
																												offset: 8139,
																											},
																											end: {
																												line: 337,
																												column: 23,
																												offset: 8139,
																											},
																										},
																									},
																									children: [
																										{
																											type: 'text',
																											value: '\n              ',
																											position: {
																												start: {
																													line: 337,
																													column: 24,
																													offset: 8140,
																												},
																												end: {
																													line: 338,
																													column: 15,
																													offset: 8155,
																												},
																											},
																										},
																										{
																											type: 'svelte_void_block',
																											name: 'html',
																											expression: {
																												type: 'svelte_expression',
																												value: 'row[item.cell] ',
																												position: {
																													start: {
																														line: 338,
																														column: 23,
																														offset: 8163,
																													},
																													end: {
																														line: 338,
																														column: 38,
																														offset: 8178,
																													},
																												},
																											},
																											position: {
																												start: {
																													line: 338,
																													column: 15,
																													offset: 8155,
																												},
																												end: {
																													line: 338,
																													column: 39,
																													offset: 8179,
																												},
																											},
																										},
																										{
																											type: 'text',
																											value: '\n              ',
																											position: {
																												start: {
																													line: 338,
																													column: 39,
																													offset: 8179,
																												},
																												end: {
																													line: 339,
																													column: 15,
																													offset: 8194,
																												},
																											},
																										},
																									],
																									position: {
																										start: {
																											line: 337,
																											column: 15,
																											offset: 8131,
																										},
																										end: {
																											line: 339,
																											column: 15,
																											offset: 8194,
																										},
																									},
																								},
																							],
																							position: {
																								start: {
																									line: 333,
																									column: 15,
																									offset: 7895,
																								},
																								end: {
																									line: 339,
																									column: 22,
																									offset: 8201,
																								},
																							},
																						},
																						{
																							type: 'text',
																							value: '\n            ',
																							position: {
																								start: {
																									line: 339,
																									column: 22,
																									offset: 8201,
																								},
																								end: {
																									line: 340,
																									column: 13,
																									offset: 8214,
																								},
																							},
																						},
																					],
																					position: {
																						start: {
																							line: 332,
																							column: 13,
																							offset: 7848,
																						},
																						end: {
																							line: 340,
																							column: 18,
																							offset: 8219,
																						},
																					},
																				},
																				{
																					type: 'text',
																					value: '\n            ',
																					position: {
																						start: {
																							line: 340,
																							column: 18,
																							offset: 8219,
																						},
																						end: {
																							line: 341,
																							column: 13,
																							offset: 8232,
																						},
																					},
																				},
																			],
																			position: {
																				start: {
																					line: 331,
																					column: 13,
																					offset: 7810,
																				},
																				end: {
																					line: 341,
																					column: 13,
																					offset: 8232,
																				},
																			},
																		},
																	],
																	position: {
																		start: {
																			line: 331,
																			column: 13,
																			offset: 7810,
																		},
																		end: {
																			line: 341,
																			column: 22,
																			offset: 8241,
																		},
																	},
																},
																{
																	type: 'text',
																	value: '\n          ',
																	position: {
																		start: {
																			line: 341,
																			column: 22,
																			offset: 8241,
																		},
																		end: {
																			line: 342,
																			column: 11,
																			offset: 8252,
																		},
																	},
																},
															],
															position: {
																start: {
																	line: 330,
																	column: 11,
																	offset: 7710,
																},
																end: {
																	line: 342,
																	column: 16,
																	offset: 8257,
																},
															},
														},
														{
															type: 'text',
															value: '\n          ',
															position: {
																start: {
																	line: 342,
																	column: 16,
																	offset: 8257,
																},
																end: {
																	line: 343,
																	column: 11,
																	offset: 8268,
																},
															},
														},
													],
													position: {
														start: {
															line: 329,
															column: 11,
															offset: 7678,
														},
														end: {
															line: 343,
															column: 11,
															offset: 8268,
														},
													},
												},
											],
											position: {
												start: {
													line: 329,
													column: 11,
													offset: 7678,
												},
												end: {
													line: 343,
													column: 20,
													offset: 8277,
												},
											},
										},
										{
											type: 'text',
											value: '\n      ',
											position: {
												start: {
													line: 343,
													column: 20,
													offset: 8277,
												},
												end: {
													line: 344,
													column: 7,
													offset: 8284,
												},
											},
										},
									],
									position: {
										start: {
											line: 320,
											column: 7,
											offset: 7408,
										},
										end: {
											line: 344,
											column: 15,
											offset: 8292,
										},
									},
								},
								{
									type: 'text',
									value: '\n    ',
									position: {
										start: {
											line: 344,
											column: 15,
											offset: 8292,
										},
										end: {
											line: 345,
											column: 5,
											offset: 8297,
										},
									},
								},
							],
							position: {
								start: {
									line: 286,
									column: 5,
									offset: 6321,
								},
								end: {
									line: 345,
									column: 13,
									offset: 8305,
								},
							},
						},
						{
							type: 'text',
							value: '\n  ',
							position: {
								start: {
									line: 345,
									column: 13,
									offset: 8305,
								},
								end: {
									line: 346,
									column: 3,
									offset: 8308,
								},
							},
						},
					],
					position: {
						start: {
							line: 285,
							column: 3,
							offset: 6282,
						},
						end: {
							line: 346,
							column: 9,
							offset: 8314,
						},
					},
				},
				{
					type: 'text',
					value: '\n\n  ',
					position: {
						start: {
							line: 346,
							column: 9,
							offset: 8314,
						},
						end: {
							line: 348,
							column: 3,
							offset: 8318,
						},
					},
				},
				{
					type: 'svelte_branching_block',
					name: 'if',
					branches: [
						{
							type: 'svelte_branch',
							name: 'if',
							expression: {
								type: 'svelte_expression',
								value: 'hasPagination ',
								position: {
									start: {
										line: 348,
										column: 9,
										offset: 8324,
									},
									end: {
										line: 348,
										column: 23,
										offset: 8338,
									},
								},
							},
							children: [
								{
									type: 'text',
									value: '\n  ',
									position: {
										start: {
											line: 348,
											column: 24,
											offset: 8339,
										},
										end: {
											line: 349,
											column: 3,
											offset: 8342,
										},
									},
								},
								{
									type: 'svelte_branching_block',
									name: 'if',
									branches: [
										{
											type: 'svelte_branch',
											name: 'if',
											expression: {
												type: 'svelte_expression',
												value: 'itemTotal > 0 && currentPage > 0 ',
												position: {
													start: {
														line: 349,
														column: 9,
														offset: 8348,
													},
													end: {
														line: 349,
														column: 42,
														offset: 8381,
													},
												},
											},
											children: [
												{
													type: 'text',
													value: '\n  ',
													position: {
														start: {
															line: 349,
															column: 43,
															offset: 8382,
														},
														end: {
															line: 350,
															column: 3,
															offset: 8385,
														},
													},
												},
												{
													type: 'svelte_element',
													tag: 'div',
													properties: [
														{
															type: 'svelte_property',
															name: 'class',
															value: [
																{
																	type: 'text',
																	value: 'pagination',
																	position: {
																		start: {
																			line: 350,
																			column: 15,
																			offset: 8397,
																		},
																		end: {
																			line: 350,
																			column: 26,
																			offset: 8408,
																		},
																	},
																},
															],
															modifiers: [],
															shorthand: 'none',
															position: {
																start: {
																	line: 350,
																	column: 8,
																	offset: 8390,
																},
																end: {
																	line: 350,
																	column: 26,
																	offset: 8408,
																},
															},
														},
													],
													selfclosing: false,
													children: [
														{
															type: 'text',
															value: '\n    ',
															position: {
																start: {
																	line: 350,
																	column: 27,
																	offset: 8409,
																},
																end: {
																	line: 351,
																	column: 5,
																	offset: 8414,
																},
															},
														},
														{
															type: 'svelte_component',
															tag: 'Pagination',
															properties: [
																{
																	type: 'svelte_directive',
																	name: 'on',
																	value: [
																		{
																			type: 'svelte_dynamic_content',
																			position: {
																				start: {
																					line: 351,
																					column: 28,
																					offset: 8437,
																				},
																				end: {
																					line: 351,
																					column: 38,
																					offset: 8447,
																				},
																			},
																			expression: {
																				type: 'svelte_expression',
																				value: 'onChange',
																				position: {
																					start: {
																						line: 351,
																						column: 29,
																						offset: 8438,
																					},
																					end: {
																						line: 351,
																						column: 37,
																						offset: 8446,
																					},
																				},
																			},
																		},
																	],
																	modifiers: [],
																	shorthand: 'none',
																	position: {
																		start: {
																			line: 351,
																			column: 17,
																			offset: 8426,
																		},
																		end: {
																			line: 351,
																			column: 39,
																			offset: 8448,
																		},
																	},
																	specifier: 'change',
																},
																{
																	type: 'svelte_directive',
																	name: 'bind',
																	value: [
																		{
																			type: 'svelte_dynamic_content',
																			position: {
																				start: {
																					line: 351,
																					column: 55,
																					offset: 8464,
																				},
																				end: {
																					line: 351,
																					column: 65,
																					offset: 8474,
																				},
																			},
																			expression: {
																				type: 'svelte_expression',
																				value: 'pageSize',
																				position: {
																					start: {
																						line: 351,
																						column: 56,
																						offset: 8465,
																					},
																					end: {
																						line: 351,
																						column: 64,
																						offset: 8473,
																					},
																				},
																			},
																		},
																	],
																	modifiers: [],
																	shorthand: 'none',
																	position: {
																		start: {
																			line: 351,
																			column: 40,
																			offset: 8449,
																		},
																		end: {
																			line: 351,
																			column: 66,
																			offset: 8475,
																		},
																	},
																	specifier: 'pageSize',
																},
																{
																	type: 'svelte_directive',
																	name: 'bind',
																	value: [
																		{
																			type: 'svelte_dynamic_content',
																			position: {
																				start: {
																					line: 351,
																					column: 81,
																					offset: 8490,
																				},
																				end: {
																					line: 351,
																					column: 94,
																					offset: 8503,
																				},
																			},
																			expression: {
																				type: 'svelte_expression',
																				value: 'currentPage',
																				position: {
																					start: {
																						line: 351,
																						column: 82,
																						offset: 8491,
																					},
																					end: {
																						line: 351,
																						column: 93,
																						offset: 8502,
																					},
																				},
																			},
																		},
																	],
																	modifiers: [],
																	shorthand: 'none',
																	position: {
																		start: {
																			line: 351,
																			column: 67,
																			offset: 8476,
																		},
																		end: {
																			line: 351,
																			column: 95,
																			offset: 8504,
																		},
																	},
																	specifier: 'current',
																},
																{
																	type: 'svelte_property',
																	name: 'total',
																	value: [
																		{
																			type: 'svelte_dynamic_content',
																			position: {
																				start: {
																					line: 351,
																					column: 103,
																					offset: 8512,
																				},
																				end: {
																					line: 351,
																					column: 116,
																					offset: 8525,
																				},
																			},
																			expression: {
																				type: 'svelte_expression',
																				value: ' itemTotal ',
																				position: {
																					start: {
																						line: 351,
																						column: 104,
																						offset: 8513,
																					},
																					end: {
																						line: 351,
																						column: 115,
																						offset: 8524,
																					},
																				},
																			},
																		},
																	],
																	modifiers: [],
																	shorthand: 'none',
																	position: {
																		start: {
																			line: 351,
																			column: 96,
																			offset: 8505,
																		},
																		end: {
																			line: 351,
																			column: 117,
																			offset: 8526,
																		},
																	},
																},
															],
															selfclosing: false,
															children: [
																{
																	type: 'text',
																	value: '\n    ',
																	position: {
																		start: {
																			line: 351,
																			column: 118,
																			offset: 8527,
																		},
																		end: {
																			line: 352,
																			column: 5,
																			offset: 8532,
																		},
																	},
																},
															],
															position: {
																start: {
																	line: 351,
																	column: 5,
																	offset: 8414,
																},
																end: {
																	line: 352,
																	column: 18,
																	offset: 8545,
																},
															},
														},
														{
															type: 'text',
															value: '\n  ',
															position: {
																start: {
																	line: 352,
																	column: 18,
																	offset: 8545,
																},
																end: {
																	line: 353,
																	column: 3,
																	offset: 8548,
																},
															},
														},
													],
													position: {
														start: {
															line: 350,
															column: 3,
															offset: 8385,
														},
														end: {
															line: 353,
															column: 9,
															offset: 8554,
														},
													},
												},
												{
													type: 'text',
													value: '\n  ',
													position: {
														start: {
															line: 353,
															column: 9,
															offset: 8554,
														},
														end: {
															line: 354,
															column: 3,
															offset: 8557,
														},
													},
												},
											],
											position: {
												start: {
													line: 349,
													column: 3,
													offset: 8342,
												},
												end: {
													line: 354,
													column: 3,
													offset: 8557,
												},
											},
										},
									],
									position: {
										start: {
											line: 349,
											column: 3,
											offset: 8342,
										},
										end: {
											line: 354,
											column: 10,
											offset: 8564,
										},
									},
								},
								{
									type: 'text',
									value: '\n  ',
									position: {
										start: {
											line: 354,
											column: 10,
											offset: 8564,
										},
										end: {
											line: 355,
											column: 3,
											offset: 8567,
										},
									},
								},
							],
							position: {
								start: {
									line: 348,
									column: 3,
									offset: 8318,
								},
								end: {
									line: 355,
									column: 3,
									offset: 8567,
								},
							},
						},
					],
					position: {
						start: {
							line: 348,
							column: 3,
							offset: 8318,
						},
						end: {
							line: 355,
							column: 10,
							offset: 8574,
						},
					},
				},
				{
					type: 'text',
					value: '\n \n  ',
					position: {
						start: {
							line: 355,
							column: 10,
							offset: 8574,
						},
						end: {
							line: 357,
							column: 3,
							offset: 8579,
						},
					},
				},
				{
					type: 'svelte_branching_block',
					name: 'if',
					branches: [
						{
							type: 'svelte_branch',
							name: 'if',
							expression: {
								type: 'svelte_expression',
								value: 'isLoading ',
								position: {
									start: {
										line: 357,
										column: 9,
										offset: 8585,
									},
									end: {
										line: 357,
										column: 19,
										offset: 8595,
									},
								},
							},
							children: [
								{
									type: 'text',
									value: '\n  ',
									position: {
										start: {
											line: 357,
											column: 20,
											offset: 8596,
										},
										end: {
											line: 358,
											column: 3,
											offset: 8599,
										},
									},
								},
								{
									type: 'svelte_element',
									tag: 'div',
									properties: [
										{
											type: 'svelte_property',
											name: 'class',
											value: [
												{
													type: 'text',
													value: 'loader',
													position: {
														start: {
															line: 358,
															column: 15,
															offset: 8611,
														},
														end: {
															line: 358,
															column: 22,
															offset: 8618,
														},
													},
												},
											],
											modifiers: [],
											shorthand: 'none',
											position: {
												start: {
													line: 358,
													column: 8,
													offset: 8604,
												},
												end: {
													line: 358,
													column: 22,
													offset: 8618,
												},
											},
										},
									],
									selfclosing: false,
									children: [
										{
											type: 'text',
											value: '\n    ',
											position: {
												start: {
													line: 358,
													column: 23,
													offset: 8619,
												},
												end: {
													line: 359,
													column: 5,
													offset: 8624,
												},
											},
										},
										{
											type: 'svelte_element',
											tag: 'div',
											properties: [
												{
													type: 'svelte_property',
													name: 'class',
													value: [
														{
															type: 'text',
															value: 'loader_spinner',
															position: {
																start: {
																	line: 359,
																	column: 17,
																	offset: 8636,
																},
																end: {
																	line: 359,
																	column: 32,
																	offset: 8651,
																},
															},
														},
													],
													modifiers: [],
													shorthand: 'none',
													position: {
														start: {
															line: 359,
															column: 10,
															offset: 8629,
														},
														end: {
															line: 359,
															column: 32,
															offset: 8651,
														},
													},
												},
											],
											selfclosing: false,
											children: [
												{
													type: 'text',
													value: '\n      ',
													position: {
														start: {
															line: 359,
															column: 33,
															offset: 8652,
														},
														end: {
															line: 360,
															column: 7,
															offset: 8659,
														},
													},
												},
												{
													type: 'svelte_component',
													tag: 'Spinner',
													properties: [],
													selfclosing: false,
													children: [],
													position: {
														start: {
															line: 360,
															column: 7,
															offset: 8659,
														},
														end: {
															line: 360,
															column: 26,
															offset: 8678,
														},
													},
												},
												{
													type: 'text',
													value: '\n    ',
													position: {
														start: {
															line: 360,
															column: 26,
															offset: 8678,
														},
														end: {
															line: 361,
															column: 5,
															offset: 8683,
														},
													},
												},
											],
											position: {
												start: {
													line: 359,
													column: 5,
													offset: 8624,
												},
												end: {
													line: 361,
													column: 11,
													offset: 8689,
												},
											},
										},
										{
											type: 'text',
											value: '\n  ',
											position: {
												start: {
													line: 361,
													column: 11,
													offset: 8689,
												},
												end: {
													line: 362,
													column: 3,
													offset: 8692,
												},
											},
										},
									],
									position: {
										start: {
											line: 358,
											column: 3,
											offset: 8599,
										},
										end: {
											line: 362,
											column: 9,
											offset: 8698,
										},
									},
								},
								{
									type: 'text',
									value: '\n  ',
									position: {
										start: {
											line: 362,
											column: 9,
											offset: 8698,
										},
										end: {
											line: 363,
											column: 3,
											offset: 8701,
										},
									},
								},
							],
							position: {
								start: {
									line: 357,
									column: 3,
									offset: 8579,
								},
								end: {
									line: 363,
									column: 3,
									offset: 8701,
								},
							},
						},
					],
					position: {
						start: {
							line: 357,
							column: 3,
							offset: 8579,
						},
						end: {
							line: 363,
							column: 10,
							offset: 8708,
						},
					},
				},
				{
					type: 'text',
					value: '\n',
					position: {
						start: {
							line: 363,
							column: 10,
							offset: 8708,
						},
						end: {
							line: 364,
							column: 1,
							offset: 8709,
						},
					},
				},
			],
			position: {
				start: {
					line: 284,
					column: 1,
					offset: 6258,
				},
				end: {
					line: 364,
					column: 7,
					offset: 8715,
				},
			},
		},
	],
	position: {
		start: {
			column: 1,
			line: 1,
			offset: 0,
		},
		end: {
			line: 364,
			column: 7,
			offset: 8715,
		},
	},
};
