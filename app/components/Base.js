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
	constructor() {
		super();
		this.state = {
			tags: [],
			showNav: false
		};
		this.toggleTag = this.toggleTag.bind(this);
		this.handleToggleFilters = this.handleToggleFilters.bind(this);
	}

	handleToggleFilters() {
		const showNav = !this.state.showNav;
		this.setState({
			showNav
		});
	}

	toggleTag(tag) {
		const tags = [ ...this.state.tags ];
		const index = tags.indexOf(tag);
		let nextTags = [];
		if (index === -1) {
			nextTags = [ ...tags, tag ];
		} else {
			nextTags = tags.slice(0, index).concat(tags.slice(index + 1));
		}
		this.setState({
			tags: nextTags
		});
	}

	onData(res, toggleTag) {
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
								{res.owner}/{res.owner.length > 10 || res.repo.length > 10 ? <br /> : ''}{res.repo}
							</a>
						</div>
						<div className="card-tags">
							{res.tags.slice(0, 5).map(tag => <span className="card-tag" key={`${res.repo}-${tag}`} onClick={() => toggleTag(tag)}>#{tag}</span>)}
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
				<div className={`${this.state.showNav ? 'full-header' : ''}`}>
					<header>
						<div className="search-params">
							<div className="title">
								<a href="/">
									<h3>Git<br />Xplore</h3>
								</a>
								<CategorySearch
									title="Repos"
									componentId="repo"
									appbaseField="repo"
									categoryField="language"
									placeholder="Search Repos"
									autocomplete={false}
									URLParams={true}
								/>
							</div>
							<div className="toggle-button" onClick={this.handleToggleFilters}>
								Toggle Filters
							</div>
							<div className="search-filters">
								<MultiDropdownList
									componentId="tags"
									appbaseField="tags"
									title="Repo Tags"
									searchPlaceholder="Search Tags"
									initialLoader="Loading Tags..."
									defaultSelected={this.state.tags}
									size={500}
									URLParams={true}
								/>
								<RangeSlider
									title="Repo Stars"
									componentId="stars"
									appbaseField="stars"
									initialLoader="Loading data..."
									showHistogram={false}
									URLParams={true}
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
				</div>
				<div className="content">
					<ResultCard
						componentId="SearchResult"
						appbaseField="repo"
						initialLoader="Loading data..."
						noResults="Oops! Nothing found."
						pagination={true}
						paginationAt="both"
						size={12}
						onData={(res) => this.onData(res, this.toggleTag)}
						react={{
							and: ["repo", "tags", "stars"]
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
