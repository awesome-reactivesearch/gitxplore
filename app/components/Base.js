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
			desc: (
				<div className="card-layout">
					<div className="card-left">
						<img src={res.avatar} className="card-image" />
						<a href={res.url} target="_blank">
							<div className="card-stars">
								<i className="fa fa-star" aria-hidden="true" />{res.stars}
							</div>
						</a>
					</div>
					<div className="card-right">
						<div className="card-title">
							<a href={res.url} target="_blank">
								{res.owner}/{res.owner.length > 8 || res.repo.length > 10 ? <br /> : ''}{res.repo}
							</a>
						</div>
						<div className="card-tags">
							{res.tags.slice(0, 5).map(tag => <span className="card-tag" key={tag}>#{tag}</span>)}
						</div>
					</div>
				</div>
			)
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
					<div className="search-params">
						<div className="title">
							<h3>GitXplore</h3>
						</div>
						<div className="search-filters">
							<CategorySearch
								title="Repos"
								componentId="SearchSensor"
								appbaseField="repo"
								categoryField="language"
								placeholder="Search Repos"
								autocomplete={false}
								URLParams={true}
							/>
							<MultiDropdownList
								componentId="TagSensor"
								appbaseField="tags"
								title="Repo Tags"
								searchPlaceholder="Search Tags"
								initialLoader="Loading Tags..."
								URLParams={true}
								defaultSelected={[]}
							/>
							<RangeSlider
								title="Repo Stars"
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
								rangeLabels={{
										"start": "0 Stars",
										"end": "70K Stars"
								}}
								stepValue={50}
							/>
						</div>
					</div>
				</header>
				<div className="content">
					<ResultCard
						componentId="SearchResult"
						appbaseField="repo"
						initialLoader="Loading data..."
						noResults="Oops! Nothing found."
						pagination={true}
						size={12}
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
								label: "Alphabetic",
								appbaseField: "owner",
								sortBy: "asc"
							},
							{
								label: "Reverse alphabetic",
								appbaseField: "owner",
								sortBy: "desc"
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
