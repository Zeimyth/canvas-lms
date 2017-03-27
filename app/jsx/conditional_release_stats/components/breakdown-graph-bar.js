import React from 'react'
import I18n from 'i18n!cyoe_assignment_sidebar'
  const { string, number, func } = React.PropTypes

  class BreakdownGraph extends React.Component {
    static propTypes = {
      rangeStudents: number.isRequired,
      totalStudents: number.isRequired,
      lowerBound: string.isRequired,
      upperBound: string.isRequired,
      rangeIndex: number.isRequired,
      openSidebar: func.isRequired,
      selectRange: func.isRequired,
    }

    constructor () {
      super()
      this.selectRange = this.selectRange.bind(this)
    }

    selectRange (e) {
      this.props.openSidebar(e.target)
      this.props.selectRange(this.props.rangeIndex)
    }

    renderInnerBar() {
      const width = Math.min((this.props.rangeStudents / this.props.totalStudents) * 100, 100)
      const progressBarStyle = { width: width + '%' }
      if (width > 0) {
        return (
          <div style={progressBarStyle} className='crs-bar__horizontal-inside-fill'></div>
        )
      } else {
        return null
      }
    }

    render () {
      const { rangeStudents, totalStudents } = this.props
      return (
        <div className='crs-bar__container'>
          <div className='crs-bar__horizontal-outside'>
            <div className='crs-bar__horizontal-inside'></div>
            { this.renderInnerBar() }
          </div>
          <div className='crs-bar__bottom'>
            <span className='crs-bar__info'>{I18n.t('%{lowerBound}+ to %{upperBound}', {
              upperBound: this.props.upperBound,
              lowerBound: this.props.lowerBound,
            })}
            </span>
            <button
              className='crs-link-button'
              onClick={this.selectRange}
              aria-label={I18n.t(
                '%{rangeStudents} out of %{totalStudents} students, click to view range student details',
                { rangeStudents, totalStudents }
              )}
              title={I18n.t('View range student details')}
            >
              {I18n.t(
                '%{rangeStudents} out of %{totalStudents} students',
                { rangeStudents, totalStudents }
              )}
            </button>
          </div>
        </div>
      )
    }
  }

export default BreakdownGraph
