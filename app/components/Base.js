import React, { Component } from 'react';
import {
	ReactiveBase,
	CategorySearch,
	ResultCard,
	MultiDropdownList,
	RangeSlider,
	DataSearch,
	SingleDropdownRange
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
		this.resetTag = this.resetTag.bind(this);
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

	resetTag(tags) {
		this.setState({
			tags
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
				credentials="bYTSo47tj:d001826a-f4ef-42c5-b0aa-a94f29967ba0"
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
									componentId="language"
									appbaseField="language.raw"
									title="Language"
									searchPlaceholder="Search"
									initialLoader="Loading Languages..."
									size={1000}
									URLParams={true}
								/>
								<MultiDropdownList
									componentId="topics"
									appbaseField="topics.raw"
									title="Repo Topics"
									searchPlaceholder="Search"
									initialLoader="Loading Topics..."
									defaultSelected={this.state.tags}
									onValueChange={value => this.resetTag(value)}
									size={1000}
									URLParams={true}
								/>
								<SingleDropdownRange
									componentId="pushed"
									appbaseField="pushed"
									title="Last Active"
									URLParams={true}
									data={[
										{"start": "2017-05-30T00:00:13Z", "end": "2017-07-06T09:22:30Z", "label": "This month"},
										{"start": "2000-05-30T00:00:13Z", "end": "2017-05-29T05:41:13Z", "label": "Past"}
									]}
								/>
								<SingleDropdownRange
									componentId="created"
									appbaseField="created"
									title="Created"
									URLParams={true}
									data={[
										{"start": "2017-01-01T00:00:13Z", "end": "2017-07-06T09:22:30Z", "label": "This year"},
										{"start": "2016-01-01T00:00:13Z", "end": "2017-01-01T00:00:13Z", "label": "Last year"},
										{"start": "2000-05-30T00:00:13Z", "end": "2016-01-01T00:00:13Z", "label": "Past"},
									]}
								/>
								<RangeSlider
									title="Repo Stars"
									componentId="stars"
									appbaseField="stars"
									initialLoader="Loading data..."
									showHistogram={false}
									URLParams={false}
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
									URLParams={false}
									range={{
										"start": 0,
										"end": 180000
									}}
									defaultSelected={{
										"start": 0,
										"end": 180000
									}}
									rangeLabels={{
										"start": "0 Forks",
										"end": "180K Forks"
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
						appbaseField={["name", "description", "name.raw", "fullname", "owner", "topics"]}
						categoryField="language.raw"
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
							and: ["repo", "topics", "stars", "description", "forks", "pushed", "created", "language"]
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
								appbaseField: "owner.raw",
								sortBy: "asc"
							},
							{
								label: "Reverse alphabetic",
								appbaseField: "owner.raw",
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
