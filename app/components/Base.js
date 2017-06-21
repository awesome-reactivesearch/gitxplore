import React, { Component } from 'react';
import {
	ReactiveBase,
	CategorySearch,
	ResultCard,
	MultiDropdownList,
	RangeSlider
} from '@appbaseio/reactivesearch';

import './Base.styl';

class Base extends Component {

	onData(res) {
		const result = {
			image: res.avatar,
			desc: (
				<div className="card-layout">
					<div className="card-title">{res.repo}</div>
					<div className="card-stars"><strong>{res.stars}</strong> 🌟s</div>
					<div className="card-creator">Created by <strong>{res.owner}</strong></div>
					<div className="card-date">Created on <strong>{(() => {
						const date =  new Date(res['created-on'])
						return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
					})()}</strong></div>
				</div>
			),
			url: res.url
		};
		return result;
	}

	render() {
		return (
			<ReactiveBase
				app="divgitxplore"
		    credentials="pRT1OUQPM:4c3263ae-e543-4b4b-867a-a30014fae8d5"
				theme="rbc-green"
			>
				<header>
					<h2>GitXplore</h2>
					<h5>A reactive github repo search</h5>
					<CategorySearch
						componentId="SearchSensor"
						appbaseField="repo"
						categoryField="language"
						placeholder="Search Repos"
						autocomplete={false}
					/>
					<div className="search-params">
						<MultiDropdownList
							componentId="TagSensor"
							appbaseField="tags"
							title="Repo Tags"
							searchPlaceholder="Search Tags"
							initialLoader="Loading Tags..."
							defaultSelected={[]}
						/>
						<RangeSlider
							title="Stars 🌠"
							componentId="RangeSliderSensor"
							appbaseField="stars"
							initialLoader="Loading data..."
							showHistogram={false}
							range={{
								"start": 0,
								"end": 70000
							}}
							defaultSelected={{
								"start": 0,
								"end": 70000
							}}
							stepValue={50}
						/>
					</div>
				</header>
				<div className="content">
					<ResultCard
						componentId="SearchResult"
						appbaseField="repo"
						title="Results"
						initialLoader="Loading data..."
						noResults="Oops! Nothing found."
						pagination={true}
						onData={this.onData}
						react={{
							and: ["SearchSensor", "TagSensor", "RangeSliderSensor"]
						}}
						sortOptions={[
							{
								label: "Highest rated",
								appbaseField: "stars",
								sortBy: "desc"
							},
							{
								label: "Lowest rated",
								appbaseField: "stars",
								sortBy: "asc"
							},
							{
								label: "Most recent",
								appbaseField: "created-on",
								sortBy: "desc"
							},
							{
								label: "Least recent",
								appbaseField: "created-on",
								sortBy: "asc"
							}
						]}
					/>
				</div>
			</ReactiveBase>
		);
	}
}

export default Base;
