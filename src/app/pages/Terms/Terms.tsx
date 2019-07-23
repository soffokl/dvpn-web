import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { NAV_PROVIDER_DASHBOARD, NAV_PROVIDER_SETTINGS } from '../../../provider/provider.links'
import trans from '../../../trans'
import Button from '../../../ui-kit/components/Button/Button'
import Checkbox from '../../../ui-kit/components/Checkbox/Checkbox'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { compose } from 'redux'
import immutableProps from '../../../hocs/immutableProps'
import ReactMarkdown from 'react-markdown'
import { DefaultProps } from '../../../types'
import { TermsMd } from '@mysteriumnetwork/terms'
import { version } from '@mysteriumnetwork/terms/package.json'
import { acceptTermsAction } from './actions'
import { push } from 'connected-react-router'
import { TermsState } from './reducer'

const styles = require('./Terms.module.scss')

type Props = DefaultProps & {
  terms: TermsState
  onAcceptTerms: Function
}

class Terms extends React.PureComponent<Props, { accept: boolean }> {
  constructor(props) {
    super(props)
    this.state = { accept: false }
  }

  handleAcceptSubmit = () => {
    const { onAcceptTerms } = this.props
    onAcceptTerms(version)
  }

  handleAcceptChange = () => {
    this.setState({ accept: !this.state.accept })
  }

  render() {
    const { terms } = this.props

    if (terms[version]) {
      return (
        <Redirect to={NAV_PROVIDER_DASHBOARD}/>
      )
    }

    return (
      <div className={styles.appTermsCover}>
        <div className={styles.appTermsListCover}>
          <ReactMarkdown escapeHtml={false} source={TermsMd}/>
        </div>
        <div className={styles.bottomBar}>
          <div className={styles.barContent}>
            <div>
              <span className={styles.catMysterium}/>
              <p className={styles.termsAgreement}>
                <Checkbox label={trans('app.onboarding.terms.agree.label')}
                          checked={this.state.accept}
                          onChange={this.handleAcceptChange}/>
              </p>
              <Link to={NAV_PROVIDER_SETTINGS}>
                <Button color="primary"
                        disabled={!this.state.accept}
                        onClick={this.handleAcceptSubmit}>{trans('app.onboarding.continue.btn')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  terms: state.terms
})

const mapDispatchToProps = (dispatch) => ({
  onAcceptTerms: (value) => {
    dispatch(acceptTermsAction(value))
    dispatch(push(NAV_PROVIDER_DASHBOARD))
  }
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withStyles({})(compose(withConnect, immutableProps)(Terms))
