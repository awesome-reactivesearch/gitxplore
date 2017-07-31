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
				app="gitxplore-live"
				credentials="bYTSo47tj:d001826a-f4ef-42c5-b0aa-a94f29967ba0"
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
										{"start": "now-1y", "end": "now", "label": "Last year"},
										{"start": "now-3y", "end": "now", "label": "Last 3 years"},
										{"start": "now-10y", "end": "now", "label": "All time"},
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
									stepValue={100}
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
