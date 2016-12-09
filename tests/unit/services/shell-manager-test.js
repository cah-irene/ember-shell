/* jshint expr:true */
/* global: Promise */
import { expect } from 'chai';
import { beforeEach } from 'mocha';
import { describeModule, it } from 'ember-mocha';
import Workspace from 'ember-shell/system/workspace';

const TEST_APP_NAME = 'esh-test-app';

let manager;

describeModule(
  'service:shell-manager',
  'ShellManagerService',
  {
    needs: ['service:asset-loader']
  },
  function() {

    beforeEach(function() {
      const assetLoader = this.container.lookup('service:asset-loader');
      assetLoader.pushManifest({"bundles": {"esh-task-manager": {"assets": [{"uri": "/engines-dist/esh-task-manager/assets/engine-vendor.css", "type": "css"}, {"uri": "/engines-dist/esh-task-manager/assets/engine-vendor.js", "type": "js"}, {"uri": "/engines-dist/esh-task-manager/assets/engine.css", "type": "css"}, {"uri": "/engines-dist/esh-task-manager/assets/engine.js", "type": "js"} ] }, "esh-test-app": {"assets": [{"uri": "/engines-dist/esh-test-app/assets/engine-vendor.css", "type": "css"}, {"uri": "/engines-dist/esh-test-app/assets/engine-vendor.js", "type": "js"}, {"uri": "/engines-dist/esh-test-app/assets/engine.css", "type": "css"}, {"uri": "/engines-dist/esh-test-app/assets/engine.js", "type": "js"} ] } } }); 
      manager = this.subject();
    });

    /* Apps */

    it.skip('should initialize with an empty array of running apps', function() {
      expect(manager.get('apps.length')).to.equal(0);
    });

    it.skip('should be able to start a new app instance by name', function() {
      const appInstance = manager.exec(TEST_APP_NAME);
      expect(manager.get('apps').includes(appInstance)).to.be.ok;
    });

    it.skip('should be able to return a running application by name', function() {
      manager.exec(TEST_APP_NAME);
      const app = manager.getAppByName(TEST_APP_NAME);

      expect(app).to.exist;
      expect(app.get('name')).to.equal(TEST_APP_NAME);
    });

    it.skip('should be able to list available applications', function() {
      expect(0);
    });

    it.skip('should be able to tell that an application is available', function (){
      manager.exec(TEST_APP_NAME);
      expect(manager.isAppAvailable(TEST_APP_NAME)).to.be.true;
    });

    it.skip('should be able to tell that an application is running', function (){
      manager.exec(TEST_APP_NAME);
      expect(manager.isAppRunning(TEST_APP_NAME)).to.be.true;
    });

    it.skip('should be able to close a running application', function() {
      manager.exec(TEST_APP_NAME);
      manager.terminate(TEST_APP_NAME).then( exitCode => {
        expect(exitCode).to.equal(0); // EXIT_OK code number
        expect(manager.isAppRunning(TEST_APP_NAME)).to.be.false;
      });
    });

    it.skip('should be able to kill a running application', function() {
      manager.exec(TEST_APP_NAME);
      expect(manager.terminate(TEST_APP_NAME, true)).to.equal(-1); // EXIT_KILL code number
      expect(manager.isAppRunning(TEST_APP_NAME)).to.be.false;
    });

    /* Panels */

    it('should initialize with only one primary panel', function() {
      const panel = manager.get('panels.firstObject');

      expect(panel.get('isPrimary')).to.be.true;
      expect(manager.get('panels.length')).to.equal(1);
    });

    it('should be able to add and remove a non-primary panel', function() {
      const panel = manager.addPanel();

      expect(panel.get('isPrimary')).to.be.false;
      expect(manager.get('panels.length')).to.equal(2);

      manager.removePanel(panel);

      expect(manager.get('panels').includes(panel)).to.be.false;
      expect(manager.get('panels.length')).to.equal(1);
    });

    /* Workspaces */

    it('should initialize with at least one workspace', function() {
      expect(manager.get('workspaces.length')).to.equal(1);
    });

    it('should be able to set an added workspace as current workspace', function() {
      const workspace = manager.addWorkspace();
      manager.setCurrentWorkspace(workspace);

      expect(manager.get('currentWorkspace')).to.eql(workspace);
    });

    it('should not allow to set a workspace that is not created using the add method', function() {
      const workspace = Workspace.create();
      expect(() => { manager.setCurrentWorkspace(workspace);}).to.throw(Error);
    });

    it('should be able to return the current workspace', function() {
      const workspace = manager.addWorkspace();
      manager.setCurrentWorkspace(workspace);

      expect(manager.get('currentWorkspace')).to.eql(workspace);
    });

    it('should be able to return a given workspaces by number', function() {
      const workspace = manager.addWorkspace();
      manager.setCurrentWorkspace(workspace);

      expect(manager.getWorkspaceByNumber(workspace.get('id'))).to.eql(workspace);
    });

    it('should have an array of workspaces', function() {
      expect(manager.get('workspaces')).to.be.a('array');
    });

    it('should be able to add a workspace', function() {
      const workspace = manager.addWorkspace();
      expect(manager.get('workspaces').includes(workspace)).to.be.true;
    });

    it('should be able to remove a workspace', function() {
      //Adds first workspace:
      manager.addWorkspace();

      const workspace = manager.addWorkspace();
      manager.removeWorkspace(workspace);
      expect(manager.get('workspaces').includes(workspace)).to.be.false;
    });

    it('should not be able to remove a workspace if there is only one', function(){
      const workspace = manager.get('workspaces.firstObject');

      expect(() => { manager.removeWorkspace(workspace); }).to.throw(Error);
      expect(manager.get('workspaces.length')).to.equal(1);
    });

  }
);
