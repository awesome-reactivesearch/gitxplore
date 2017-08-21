import React, { Component } from 'react';
import {
	ReactiveBase,
	CategorySearch,
	ResultCard,
	MultiDropdownList,
	RangeSlider,
	SingleDropdownRange
} from '@appbaseio/reactivesearch';

import './Base.styl';

class Base extends Component {
	constructor() {
		super();
		this.state = {
			topics: [],
			showNav: false
		};
		this.toggleTopic = this.toggleTopic.bind(this);
		this.resetTopic = this.resetTopic.bind(this);
		this.handleToggleFilters = this.handleToggleFilters.bind(this);
	}

	handleToggleFilters() {
		const showNav = !this.state.showNav;
		this.setState({
			showNav
		});
	}

	toggleTopic(topic) {
		const topics = [ ...this.state.topics ];
		const index = topics.indexOf(topic);
		let nextTopics = [];
		if (index === -1) {
			nextTopics = [ ...topics, topic ];
		} else {
			nextTopics = topics.slice(0, index).concat(topics.slice(index + 1));
		}
		this.setState({
			topics: nextTopics
		});
	}

	resetTopic(topics) {
		this.setState({
			topics
		});
	}

	onData(res, toggleTopic) {
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
										{res.topics.slice(0, 7).map(topic => <span className="card-tag" key={`${res.name}-${topic}`} onClick={() => toggleTopic(topic)}>#{topic}</span>)}
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
				app="gitxplore-latest"
				credentials="W7ZomvYgQ:df994896-a25d-4d4e-8724-e26659b93001"
				theme="rbc-green"
			>
				<div className={`${this.state.showNav ? 'full-header' : ''}`}>
					<header>
						<div className="search-params">
							<div className="title">
								<a href="https://appbaseio-apps.github.io/gitxplore/">
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
									size={100}
								/>
								<MultiDropdownList
									componentId="topics"
									appbaseField="topics.raw"
									title="Repo Topics"
									defaultSelected={this.state.topics}
									size={1000}
									queryFormat="and"
									onValueChange={value => this.resetTopic(value)}
								/>
								<SingleDropdownRange
									componentId="pushed"
									appbaseField="pushed"
									title="Last Active"
									data={[
										{"start": "now-1M", "end": "now", "label": "Last 30 days"},
										{"start": "now-6M", "end": "now", "label": "Last 6 months"},
										{"start": "now-1y", "end": "now", "label": "Last year"}
									]}
								/>
								<SingleDropdownRange
									componentId="created"
									appbaseField="created"
									title="Created"
									data={[
										{"start": "2017-01-01T00:00:00Z", "end": "2017-12-31T23:59:59Z", "label": "2017"},
										{"start": "2016-01-01T00:00:00Z", "end": "2016-12-31T23:59:59Z", "label": "2016"},
										{"start": "2015-01-01T00:00:00Z", "end": "2015-12-31T23:59:59Z", "label": "2015"},
										{"start": "2014-01-01T00:00:00Z", "end": "2014-12-31T23:59:59Z", "label": "2014"},
										{"start": "2013-01-01T00:00:00Z", "end": "2013-12-31T23:59:59Z", "label": "2013"},
										{"start": "2012-01-01T00:00:00Z", "end": "2012-12-31T23:59:59Z", "label": "2012"},
										{"start": "2011-01-01T00:00:00Z", "end": "2011-12-31T23:59:59Z", "label": "2011"},
										{"start": "2010-01-01T00:00:00Z", "end": "2010-12-31T23:59:59Z", "label": "2010"},
										{"start": "2009-01-01T00:00:00Z", "end": "2009-12-31T23:59:59Z", "label": "2009"},
										{"start": "2008-01-01T00:00:00Z", "end": "2008-12-31T23:59:59Z", "label": "2008"},
										{"start": "2007-01-01T00:00:00Z", "end": "2007-12-31T23:59:59Z", "label": "2007"}
									]}
								/>
								<RangeSlider
									componentId="stars"
									appbaseField="stars"
									title="Repo Stars"
									showHistogram={false}
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
									stepValue={50}
								/>
								<RangeSlider
									componentId="forks"
									appbaseField="forks"
									title="Repo Forks"
									showHistogram={false}
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
									stepValue={50}
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
						queryFormat="and"
						placeholder="Search Repos"
						URLParams={true}
					/>
					<ResultCard
						componentId="SearchResult"
						appbaseField="name"
						noResults="No results were found, try clearing all the filters."
						pagination={true}
						size={6}
						onData={(res) => this.onData(res, this.toggleTopic)}
						react={{
							and: ["repo", "topics", "stars", "description", "forks", "pushed", "created", "language"]
						}}
						sortOptions={[
							{
								label: "Best Match",
								appbaseField: "_score",
								sortBy: "desc"
							},
							{
								label: "Most Stars",
								appbaseField: "stars",
								sortBy: "desc"
							},
							{
								label: "Fewest Stars",
								appbaseField: "stars",
								sortBy: "asc"
							},
							{
								label: "Most Forks",
								appbaseField: "forks",
								sortBy: "desc"
							},
							{
								label: "Fewest Forks",
								appbaseField: "forks",
								sortBy: "asc"
							},
							{
								label: "A to Z",
								appbaseField: "owner.raw",
								sortBy: "asc"
							},
							{
								label: "Z to A",
								appbaseField: "owner.raw",
								sortBy: "desc"
							},
							{
								label: "Recently Updated",
								appbaseField: "pushed",
								sortBy: "desc"
							},
							{
								label: "Least Recently Updated",
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
