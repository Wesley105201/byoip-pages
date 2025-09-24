<template>
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-cascadia">隐私政策</h1>
        <div class="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
      </div>
      
      <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 h-auto">
        <div class="prose prose-lg mx-auto">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">免责声明</h2>
          <p class="mb-6">
            本网站提供的信息和服务按"现状"和"可用"基础提供。微测网不作任何明示或暗示的保证，包括但不限于适销性、特定用途适用性和不侵权的保证。
            Cloudflare, Inc.明令禁止用户在本网站上进行任何形式的“优选”行为。如果您违反此规定，您可能会面临法律诉讼，Cloudflare, Inc.将采取一切必要措施，包括但不限于终止您的账户、向相关法律部门报告您的行为。我们对此不负任何责任。
          </p>
          <p class="mb-6">
            我们不保证网站将不间断、及时、安全或无错误地运行，也不保证通过网站获得的信息的准确性或可靠性。您使用本网站及任何依赖信息的风险由您自行承担。
          </p>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-4">责任限制</h2>
          <p class="mb-6">
            在任何情况下，NB 优选及其董事、员工、合作伙伴、代理、供应商或关联公司均不对因您访问或使用本网站或服务而产生的任何间接、偶然、特殊、后果性或惩罚性损害负责，包括但不限于利润损失、数据丢失、使用中断、商誉损失或其他无形损失。
          </p>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-4">第三方链接</h2>
          <p class="mb-6">
            我们的网站可能包含指向非我们运营的其他网站的链接。如果您点击第三方链接，您将被引导至该第三方的网站。我们强烈建议您查看您访问的每个网站的隐私政策。我们无法控制任何第三方网站或服务的内容、隐私政策或做法，也不承担任何责任。
          </p>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-4">条款变更</h2>
          <p class="mb-6">
            我们保留随时修改或替换这些服务条款的权利。如果我们进行重大变更，我们将通过在本网站上发布通知或通过其他方式通知您。变更生效后继续访问或使用我们的服务，即表示您同意受修订后条款的约束。
          </p>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-4">联系我们</h2>
          <p>
            如果您对这些服务条款有任何疑问，请通过页面底部的联系方式与我们联系。
          </p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 页面标题
useHead({
  title: '隐私政策 - NB 优选服务',
  meta: [
    { name: 'description', content: 'NB 优选服务隐私政策，包含信息收集、使用和保护措施' }
  ]
})
</script>