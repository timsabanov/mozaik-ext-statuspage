import React, { Component }  from 'react';
import reactMixin            from 'react-mixin';
import { ListenerMixin }     from 'reflux';
import Mozaik                from 'mozaik/browser';

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          builds: [],
          parsedData: []
         };
    }

    // Before the component is mounted, the mixin will search for this method on the component.
    // This method MUST return an object with an `id` property.
    // It tells Mozaïk that this component is interested in data coming from `sample` generated with `sampleMethod`
    // The `id` MUST be unique across all Mozaïk extensions.
    getApiRequest() {
        const {
            title,
            sources
        } = this.props;

        return {
          id: `statuspage.data.${ title }.${ sources }`,
          params: {
            title: this.props.title,
            sources: this.props.sources
          }
        };
    }

    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data. 
    // This assumes your method will return an object containing a `count` property.
    onApiData(builds) {
        this.setState({ builds });

        // Parse API data
        const parsedData = builds.map((item, index) => {
          return {
            name: item.page.name,
            status: item.status.description,
            statusIndicator: item.status.indicator,
            time: this.formatDateTime(item.page.updated_at),
            url: item.page.url
          }
        }, this);

        this.setState({parsedData});
    }


    formatDateTime(dateTime) {
      const d = new Date(dateTime);
      const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      return datestring;
    }

    render() {
        const { title } = this.props;
        const { parsedData } = this.state;

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">
                        {title}
                    </span>
                    <i className="fa fa-user-circle" />
                </div>
                <div className="widget__body">
                  {parsedData.map((item, index) =>
                    <div className="list__item statuspage__item" key={index}>
                        <span className="statuspage__data__label" >
                          <a href={item.url} target='_blank'>{item.name}</a>
                        </span>
                        <span className={`statuspage__data__value ${item.statusIndicator}`} >
                          {item.status} 
                        </span>
                        <span className="statuspage__data__time" >
                           <i className="fa fa-clock-o" />&nbsp;
                           {item.time} 
                        </span>
                    </div> 
                  )}
                </div>
            </div>
        );
    }
}

reactMixin(Data.prototype, ListenerMixin);
reactMixin(Data.prototype, Mozaik.Mixin.ApiConsumer);

export default Data;
