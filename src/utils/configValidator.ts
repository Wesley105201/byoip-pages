import type { 
  ServicesConfig, 
  PartnersConfig, 
  SponsorsConfig, 
  CDNMirrorConfig,
  ConfigValidationResult 
} from '~/types'

// JSON Schema验证工具
export class ConfigValidator {
  private static validateJsonStructure(data: any, requiredFields: string[]): string[] {
    const errors: string[] = []
    
    if (!data || typeof data !== 'object') {
      errors.push('配置必须是一个有效的 JSON 对象')
      return errors
    }

    for (const field of requiredFields) {
      if (!(field in data)) {
        errors.push(`缺少必填字段: ${field}`)
      }
    }

    return errors
  }

  private static validateIPAddress(ip: string): boolean {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    return ipRegex.test(ip)
  }

  private static validateURL(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  static validateServicesConfig(data: any): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const structureErrors = this.validateJsonStructure(data, ['services'])
    errors.push(...structureErrors)

    if (structureErrors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    if (!Array.isArray(data.services)) {
      errors.push('服务必须是一个数组')
      return { isValid: false, errors, warnings }
    }

    data.services.forEach((service: any, index: number) => {
      const serviceErrors = this.validateJsonStructure(service, [
        'id', 'name', 'provider', 'description', 'status', 'optimizedIPs', 'nodeStatus', 'tags'
      ])
      
      serviceErrors.forEach(error => {
        errors.push(`服务 ${index}: ${error}`)
      })

      if (service.provider && !['cloudflare', 'cloudfront', 'edgeone', 'other'].includes(service.provider)) {
        errors.push(`服务 ${index}: 无效的服务提供商 "${service.provider}"`)
      }

      if (service.status && !['active', 'inactive', 'maintenance'].includes(service.status)) {
        errors.push(`服务 ${index}: 无效的服务状态 "${service.status}"`)
      }

      if (service.nodeStatus && !['online', 'offline', 'slow'].includes(service.nodeStatus)) {
        errors.push(`服务 ${index}: 无效的节点状态 "${service.nodeStatus}"`)
      }
s
      if (Array.isArray(service.optimizedIPs)) {
        service.optimizedIPs.forEach((ip: string, ipIndex: number) => {
          if (!this.validateIPAddress(ip)) {
            errors.push(`服务 ${index}: IP 地址无效，位于索引 ${ipIndex}: "${ip}"`)
          }
        })
      }

      if (service.responseTime !== undefined && (typeof service.responseTime !== 'number' || service.responseTime < 0)) {
        errors.push(`服务 ${index}: 响应时间必须是一个正数`)
      }
    })

    return { isValid: errors.length === 0, errors, warnings }
  }

  static validatePartnersConfig(data: any): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const structureErrors = this.validateJsonStructure(data, ['partners'])
    errors.push(...structureErrors)

    if (structureErrors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    if (!Array.isArray(data.partners)) {
      errors.push('合作伙伴必须是一个数组')
      return { isValid: false, errors, warnings }
    }

    data.partners.forEach((partner: any, index: number) => {
      const partnerErrors = this.validateJsonStructure(partner, [
        'id', 'name', 'logo', 'description', 'website', 'type'
      ])
      
      partnerErrors.forEach(error => {
        errors.push(`合作伙伴 ${index}: ${error}`)
      })

      if (partner.logo && !this.validateURL(partner.logo)) {
        errors.push(`合作伙伴 ${index}: 无效的 Logo URL "${partner.logo}"`)
      }

      if (partner.website && !this.validateURL(partner.website)) {
        errors.push(`合作伙伴 ${index}: 无效的网站 URL "${partner.website}"`)
      }
    })

    return { isValid: errors.length === 0, errors, warnings }
  }

  static validateSponsorsConfig(data: any): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const structureErrors = this.validateJsonStructure(data, ['sponsors'])
    errors.push(...structureErrors)

    if (structureErrors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    if (!Array.isArray(data.sponsors)) {
      errors.push('赞助商必须是一个数组')
      return { isValid: false, errors, warnings }
    }

    data.sponsors.forEach((sponsor: any, index: number) => {
      const sponsorErrors = this.validateJsonStructure(sponsor, [
        'id', 'name', 'logo', 'description', 'website', 'level'
      ])
      
      sponsorErrors.forEach(error => {
        errors.push(`赞助商 ${index}: ${error}`)
      })

      if (sponsor.level && !['diamond', 'platinum', 'gold', 'silver'].includes(sponsor.level)) {
        errors.push(`赞助商 ${index}: 无效的赞助等级 "${sponsor.level}"`)
      }

      if (sponsor.logo && !this.validateURL(sponsor.logo)) {
        errors.push(`赞助商 ${index}: 无效的 Logo URL "${sponsor.logo}"`)
      }

      if (sponsor.website && !this.validateURL(sponsor.website)) {
        errors.push(`赞助商 ${index}: 无效的网站 URL "${sponsor.website}"`)
      }
    })

    return { isValid: errors.length === 0, errors, warnings }
  }

  static validateCDNConfig(data: any): ConfigValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const structureErrors = this.validateJsonStructure(data, ['github', 'npm'])
    errors.push(...structureErrors)

    if (structureErrors.length > 0) {
      return { isValid: false, errors, warnings }
    }

    if (data.github) {
      const githubErrors = this.validateJsonStructure(data.github, ['template', 'mirror'])
      githubErrors.forEach(error => {
        errors.push(`GitHub 配置: ${error}`)
      })

      if (data.github.template) {
        const requiredPlaceholders = ['{{mirror}}', '{{owner}}', '{{repo}}', '{{branch}}', '{{path}}']
        requiredPlaceholders.forEach(placeholder => {
          if (!data.github.template.includes(placeholder)) {
            errors.push(`GitHub 模板缺少占位符: ${placeholder}`)
          }
        })
      }
    }

    if (data.npm) {
      const npmErrors = this.validateJsonStructure(data.npm, ['template', 'mirror'])
      npmErrors.forEach(error => {
        errors.push(`NPM 配置: ${error}`)
      })

      if (data.npm.template) {
        const requiredPlaceholders = ['{{mirror}}', '{{package}}', '{{version}}', '{{path}}']
        requiredPlaceholders.forEach(placeholder => {
          if (!data.npm.template.includes(placeholder)) {
            errors.push(`NPM 模板缺少占位符: ${placeholder}`)
          }
        })
      }
    }

    if (data.alternatives && data.alternatives.mirrors) {
      if (!Array.isArray(data.alternatives.mirrors)) {
        errors.push('备用镜像必须是一个数组')
      } else if (data.alternatives.mirrors.length === 0) {
        warnings.push('备用镜像数组为空')
      }
    }

    return { isValid: errors.length === 0, errors, warnings }
  }
}