import React, {Component} from 'react';

export default class ResultItem extends Component {
    componentDidMount() {

    }

    render() {
        let releaseDate = new Date(this.props.data.releaseDate);
        let delay = this.props.delay;
        return(
                <div className="itunes-results-item play" style={{animationDelay: delay + "ms"}}>
                    <div className="itunes-results-item-image">
                        <img src={this.props.data.artworkUrl100} width="100" alt="track name" />
                    </div>
                    <div className="itunes-results-item-text">
                        <h4>{this.props.data.artistName} - {this.props.data.trackName}</h4>
                        <h5>{this.props.data.collectionName} ({releaseDate.getFullYear()})</h5>
                    </div>
                </div>
        );
    }
}
