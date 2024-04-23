<template>
  <div class="grid">
    <div class="col-12">
      <div class="intro">
        <bm-container>
          <h1>Generate dynamic lib icons from svg</h1>
          <p>
            This is a simple tool to generate dynamic lib icons from svg files.
          </p>
          <h2>How?</h2>
          <TabView>
            <TabPanel header="Pure Js">
              <for-vanila-js/>
            </TabPanel>
            <TabPanel header="Vue">
              <for-vue/>
            </TabPanel>
          </TabView>
        </bm-container>
      </div>
    </div>
  </div>
</template>

<script>
import BmContainer from '@/components/layout/Container.vue'
import ForVanilaJs from './partials/ForVanilaJs.vue'
import ForVue from './partials/ForVue.vue'
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

export default {
  name: 'HomeView',
  components: {
    BmContainer,
    ForVanilaJs,
    ForVue,
    TabView,
    TabPanel
  },
  setup() {
    return {}
  }
}
</script>
