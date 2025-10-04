import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/AuthContext' // Pastikan impor ini ada
import { useConfigs, useRefreshModels } from '@/contexts/configs'
import { BASE_API_URL } from '@/constants'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { logout } from '@/api/auth'
import { PointsDisplay } from './PointsDisplay'

export function UserMenu() {
  const { authStatus, logout } = useAuth() // Gunakan 'logout' dari konteks
  const { setShowLoginDialog } = useConfigs()
  // refreshModels tidak lagi diperlukan di sini
  const { t } = useTranslation()

  const handleLogout = async () => {
    await logout() // Panggil fungsi logout dari konteks
  }

  // 如果用户已登录，显示用户菜单
  if (authStatus.is_logged_in && authStatus.user_info) {
    const { username, image_url } = authStatus.user_info
    const initials = username ? username.substring(0, 2).toUpperCase() : 'U'

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative p-0 h-auto">
            <PointsDisplay>
              <Avatar className="h-6 w-6">
                <AvatarImage src={image_url} alt={username} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </PointsDisplay>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('common:auth.myAccount')}</DropdownMenuLabel>
          <DropdownMenuItem disabled>{username}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            {t('common:auth.logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // 未登录状态，显示登录按钮
  return (
    <Button variant="outline" onClick={() => setShowLoginDialog(true)}>
      {t('common:auth.login')}
    </Button>
  )
}
