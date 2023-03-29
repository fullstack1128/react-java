import React from 'react';
import { Collapse, Button } from 'reactstrap';
import StyledFieldSet from './styled/StyledFieldSet';

class FieldSet extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: props.isOpen !== undefined ? props.isOpen : true };
  }

  toggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }

  render() {
    const { legend, children } = this.props;

    return (
      <StyledFieldSet>
        <div className="legend">
          <Button onClick={this.toggle}>
            {legend}
            <i className={`fas ${this.state.collapse ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
          </Button>
        </div>
        <Collapse isOpen={this.state.collapse}>
          {children}
        </Collapse>
      </StyledFieldSet>
    );
  }
}

export default FieldSet;
