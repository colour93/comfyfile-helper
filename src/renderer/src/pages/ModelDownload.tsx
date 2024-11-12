import ModelDownloadHomepage from '@renderer/components/model-download/homepage'
import { Tabs, TabPane } from '@douyinfe/semi-ui'
import ModelDownloadSettings from '@renderer/components/model-download/settings'

const ModelDownloadPage: React.FC = () => {
  return (
    <>
      <Tabs type="line">
        <TabPane tab="主页" itemKey="homepage">
          <ModelDownloadHomepage />
        </TabPane>
        <TabPane tab="设置" itemKey="settings">
          <ModelDownloadSettings />
        </TabPane>
      </Tabs>
    </>
  )
}

export default ModelDownloadPage
