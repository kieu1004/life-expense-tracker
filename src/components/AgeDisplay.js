import { h, Component } from 'preact';

class AgeDisplay extends Component {
    render() {
        return (
            <div className="mb-4 text-lg">
                <span>Age: {this.props.age}</span>
            </div>
        );
    }
}

export default AgeDisplay;
