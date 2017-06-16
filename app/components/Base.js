import React, { Component } from 'react';
import {
	ReactiveBase,
	CategorySearch,
	RatingsFilter,
	ResultCard,
	ResultList,
	MultiList,
	RangeSlider
} from '@appbaseio/reactivesearch';

class Base extends Component {

	onData(res) {
		const result = {
			title: res.repo,
			desc: (
				<div>
					<div><strong>{res.stars}</strong> 🌟s</div>
					<div>Created by <strong>{res.owner}</strong></div>
					<div>Created on <strong>{(() => {
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
				app="github-reactive-search"
		    credentials="T3EbxIJMZ:9c6aa498-5770-451b-916a-663b232ca0f7"
				theme="rbc-green"
			>
				<h2>GitXplore</h2>
				<h4>A reactive github repo search</h4>
				<div className="row reverse-labels">
					<div className="col s6 col-xs-6">
						<div className="row">
							<div className="col s12 col-xs-12">
								<CategorySearch
									componentId="SearchSensor"
									appbaseField="repo"
									categoryField="language"
									placeholder="Search Repos"
									autocomplete={false}
								/>
								<MultiList
									componentId="TagSensor"
									appbaseField="tags"
									title="Repo Tags"
									searchPlaceholder="Search Tags"
									showSearch
									initialLoader="Loading Tags..."
								/>
							</div>
							<div className="col s12 col-xs-12">
								<RangeSlider
									title="Stars 🌠"
									componentId="RangeSliderSensor"
									appbaseField="stars"
									initialLoader="Loading data..."
									range={{
										"start": 0,
										"end": 70000
									}}
									rangeLabels={{
										start: "0 ⭐s",
										end: "70K ⭐s"
									}}
									defaultSelected={{
										"start": 0,
										"end": 70000
									}}
									stepValue={50}
								/>
							</div>
						</div>
					</div>
					<div className="col s6 col-xs-6">
						<ResultList
							componentId="SearchResult"
							appbaseField="repo"
							title="Results"
							initialLoader="Loading data..."
							noResults="Oops! Nothing found."
							from={0}
							size={20}
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
				</div>
			</ReactiveBase>
		);
	}
}

export default Base;
