import React from 'react';
import Service from './Service'
import { actionFilterService } from '../actions/actionCreators'
import { connect } from 'react-redux';

class ServicesList extends React.Component {
  onCategoryClick = (category) => {
    const currentServiceNameFilter = this.props.serviceNameFilter

    this.props.actionFilterService(currentServiceNameFilter, category);
  }

  handleInputChange = (event) => {
    const currentServiceCategoryFilter = this.props.serviceCategoryFilter
    const target = event.target;
    const value = target.value;

    this.props.actionFilterService(value, currentServiceCategoryFilter);
  }

  render (){
    const servicesResult = this.props.servicesResult
    
    return (
      <nav className="services-list">
        <p className="panel-heading">
          Services
        </p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input is-small is-danger" type="text" placeholder="search" onChange={this.handleInputChange} />
            <span className="icon is-small is-left">
              <i className="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p className="panel-tabs">
          <a href="#" className={this.props.serviceCategoryFilter === '' ? 'is-active ' : '' + "has-text-danger"} onClick={() => this.onCategoryClick('')}>all</a>
          <a href="#" className={this.props.serviceCategoryFilter === 'facial' ? 'is-active ' : '' + "has-text-danger"} onClick={() => this.onCategoryClick('facial')}>facial</a>
          <a href="#" className={this.props.serviceCategoryFilter === 'hair' ? 'is-active ' : '' + "has-text-danger"} onClick={() => this.onCategoryClick('hair')}>hair</a>
          <a href="#" className={this.props.serviceCategoryFilter === 'nails' ? 'is-active ' : '' + "has-text-danger"} onClick={() => this.onCategoryClick('nails')}>nails</a>
          <a href="#" className={this.props.serviceCategoryFilter === 'products' ? 'is-active ' : '' + "has-text-danger"} onClick={() => this.onCategoryClick('products')}>products</a>
          <a href="#" className={this.props.serviceCategoryFilter === 'others' ? 'is-active ' : '' + "has-text-danger"} onClick={() => this.onCategoryClick('others')}>others</a>
        </p>
        {
          Object.keys(servicesResult).map(key => (
            <a className="panel-block is-active">
              <Service service={servicesResult[key]} key={servicesResult[key].name} />
            </a>
          ))
        }
      </nav>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actionFilterService: (serviceNameFilter, serviceCategoryFilter) => { dispatch(actionFilterService(serviceNameFilter, serviceCategoryFilter)) }
});

const mapStateToProps = state => ({
  servicesResult: state.servicesState.servicesResult,
  serviceNameFilter: state.servicesState.serviceNameFilter,
  serviceCategoryFilter: state.servicesState.serviceCategoryFilter
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
