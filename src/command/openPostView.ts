import * as vscode from 'vscode';
import {getWebViewContent, MethodHandler} from '../utils/commandUtils'
import {getPostList} from '../api/index'

// 展示某个帖子
export function openPostView(context: vscode.ExtensionContext) {
  return vscode.commands.registerCommand('tieba.openPostView', async url => {
    const panel = vscode.window.createWebviewPanel(
      'post',
      '帖子详情',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true
      }
    )
    const handler = new MethodHandler(context, panel)
    handler.messageHandler = {
      sayHello (message) {
        return Promise.resolve('had call sayHello')
      },
      getPostList(message) {
        return getPostList(url)
      }
    }
    panel.webview.html = getWebViewContent(context, panel, 'src/views/post/post.html')
  })
}