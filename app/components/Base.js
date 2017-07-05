import React, { Component } from 'react';
import {
	ReactiveBase,
	CategorySearch,
	ResultCard,
	MultiDropdownList,
	RangeSlider,
	DataSearch
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
					<div className="card-top">
						<div className="card-details">
							<div className="card-title">
								<img src={res.avatar} className="card-image" />
								<a href={res.url} target="_blank">
									{res.owner}/{res.owner.length + res.name.length > 27 ? <br /> : ''}{res.name}
								</a>
							</div>
							<div className="card-description">
								{res.description}
							</div>
							{
								res.topics.length > 0 ?
									<div className="card-tags">
										{res.topics.slice(0, 7).map(tag => <span className="card-tag" key={`${res.name}-${tag}`} onClick={() => toggleTag(tag)}>#{tag}</span>)}
									</div> :
									null
							}
						</div>
					</div>
					<div className="card-bottom">
						<a href={res.url} target="_blank">
							<div className="card-stars">
								<i className="fa fa-star" aria-hidden="true" />{res.stars}
							</div>
						</a>
						<a href={res.url} target="_blank">
							<div className="card-stars">
								<i className="fa fa-code-fork" aria-hidden="true" />{res.forks}
							</div>
						</a>
						<a href={res.url} target="_blank">
							<div className="card-stars">
								<i className="fa fa-eye" aria-hidden="true" />{res.watchers}
							</div>
						</a>
					</div>
				</div>
			)
		};
		return result;
	}

	render() {
		return (
			<ReactiveBase
				app="gitxplore-live"
		    credentials="mfcug4RXu:186efc11-dc28-44ab-8023-f98f0ab09bc4"
				theme="rbc-green"
			>
				<div className={`${this.state.showNav ? 'full-header' : ''}`}>
					<header>
						<div className="search-params">
							<div className="title">
								<a href="/">
									<h3>GitXplore</h3>
								</a>
							</div>
							<div className="toggle-button" onClick={this.handleToggleFilters}>
								<i className="fa fa-search-plus" aria-hidden="true" />
								Toggle Filters
							</div>
							<div className="search-filters">
								<MultiDropdownList
									componentId="tags"
									appbaseField="topics"
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
										"end": 300000
									}}
									defaultSelected={{
										"start": 0,
										"end": 300000
									}}
									rangeLabels={{
										"start": "0 Stars",
										"end": "300K Stars"
									}}
									stepValue={100}
								/>
								<RangeSlider
									title="Repo Forks"
									componentId="forks"
									appbaseField="forks"
									initialLoader="Loading data..."
									showHistogram={false}
									URLParams={true}
									range={{
										"start": 0,
										"end": 300000
									}}
									defaultSelected={{
										"start": 0,
										"end": 300000
									}}
									rangeLabels={{
										"start": "0 Forks",
										"end": "300K Forks"
									}}
									stepValue={100}
								/>
							</div>
						</div>
					</header>
				</div>
				<div className="content">
					<CategorySearch
						componentId="repo"
						appbaseField={["name", "description"]}
						categoryField="language"
						placeholder="Search Repos"
						autocomplete={false}
						URLParams={true}
					/>
					<ResultCard
						componentId="SearchResult"
						appbaseField="name"
						initialLoader="Loading data..."
						noResults="Oops! Nothing found."
						pagination={true}
						size={6}
						onData={(res) => this.onData(res, this.toggleTag)}
						react={{
							and: ["repo", "tags", "stars", "description", "forks"]
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
								label: "Most forked",
								appbaseField: "forks",
								sortBy: "desc"
							},
							{
								label: "Least forked",
								appbaseField: "forks",
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
								appbaseField: "pushed",
								sortBy: "desc"
							},
							{
								label: "Least recent",
								appbaseField: "pushed",
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
